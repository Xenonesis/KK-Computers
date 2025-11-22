import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      )
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error('STRIPE_WEBHOOK_SECRET is not set')
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      )
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      )
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session)
        break
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent)
        break
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent)
        break
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  try {
    const { course_id, user_id } = session.metadata || {}

    if (!course_id || !user_id) {
      console.error('Missing metadata in checkout session:', session.id)
      return
    }

    // Get course details
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .select('*')
      .eq('id', course_id)
      .single()

    if (courseError || !course) {
      console.error('Course not found:', course_id)
      return
    }

    // Create or update enrollment
    const { data: enrollment, error: enrollmentError } = await supabase
      .from('enrollments')
      .upsert({
        user_id: user_id,
        course_id: course_id,
        status: 'enrolled',
        payment_status: 'paid',
        stripe_payment_intent_id: session.payment_intent as string,
        amount_paid: (session.amount_total || 0) / 100, // Convert from cents
      })
      .select()
      .single()

    if (enrollmentError) {
      console.error('Error creating/updating enrollment:', enrollmentError)
      return
    }

    // Create payment record
    await supabase
      .from('payments')
      .insert({
        enrollment_id: enrollment.id,
        stripe_payment_intent_id: session.payment_intent as string,
        stripe_session_id: session.id,
        amount: (session.amount_total || 0) / 100,
        currency: session.currency || 'usd',
        status: 'succeeded',
        payment_method: session.payment_method_types?.[0] || 'card',
      })

    // Update course student count
    await supabase
      .from('courses')
      .update({ current_students: course.current_students + 1 })
      .eq('id', course_id)

    console.log('Successfully processed checkout session:', session.id)
  } catch (error) {
    console.error('Error handling checkout session completed:', error)
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    // Update payment status
    await supabase
      .from('payments')
      .update({ status: 'succeeded' })
      .eq('stripe_payment_intent_id', paymentIntent.id)

    console.log('Payment intent succeeded:', paymentIntent.id)
  } catch (error) {
    console.error('Error handling payment intent succeeded:', error)
  }
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    // Update payment status
    await supabase
      .from('payments')
      .update({ status: 'failed' })
      .eq('stripe_payment_intent_id', paymentIntent.id)

    // Update enrollment status
    await supabase
      .from('enrollments')
      .update({ payment_status: 'failed' })
      .eq('stripe_payment_intent_id', paymentIntent.id)

    console.log('Payment intent failed:', paymentIntent.id)
  } catch (error) {
    console.error('Error handling payment intent failed:', error)
  }
}
