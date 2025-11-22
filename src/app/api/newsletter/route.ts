import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// POST /api/newsletter - Subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existing } = await supabase
      .from('newsletter_subscriptions')
      .select('*')
      .eq('email', email)
      .single()

    if (existing) {
      return NextResponse.json(
        { success: false, message: 'This email is already subscribed' },
        { status: 400 }
      )
    }

    // Insert new subscription
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .insert([
        {
          email,
          subscribed_at: new Date().toISOString(),
          is_active: true
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Newsletter subscription error:', error)
      return NextResponse.json(
        { success: false, message: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      )
    }

    // TODO: Send welcome email using email service (SendGrid, Mailgun, etc.)
    // await sendWelcomeEmail(email)

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      data
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}

// GET /api/newsletter - Get all subscriptions (admin only)
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .select('*')
      .order('subscribed_at', { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch subscriptions' },
      { status: 500 }
    )
  }
}
