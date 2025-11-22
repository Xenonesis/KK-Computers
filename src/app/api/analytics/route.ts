import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// POST /api/analytics - Track analytics event
export async function POST(request: NextRequest) {
  try {
    const { event, properties, timestamp } = await request.json()

    if (!event) {
      return NextResponse.json(
        { success: false, message: 'Event name is required' },
        { status: 400 }
      )
    }

    // Get user info from headers or session
    const userAgent = request.headers.get('user-agent') || ''
    const referer = request.headers.get('referer') || ''
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || ''

    // Store analytics event
    const { data, error } = await supabase
      .from('analytics_events')
      .insert([
        {
          event_name: event,
          properties: properties || {},
          user_agent: userAgent,
          referer,
          ip_address: ip,
          created_at: timestamp || new Date().toISOString()
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Analytics storage error:', error)
      // Don't fail the request if analytics fails
      return NextResponse.json({ success: true, message: 'Event logged locally' })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Analytics error:', error)
    // Don't fail the request if analytics fails
    return NextResponse.json({ success: true, message: 'Event logged locally' })
  }
}

// GET /api/analytics - Get analytics data (admin only)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const eventName = searchParams.get('event')
    const startDate = searchParams.get('start_date')
    const endDate = searchParams.get('end_date')
    const limit = parseInt(searchParams.get('limit') || '100')

    let query = supabase
      .from('analytics_events')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (eventName) {
      query = query.eq('event_name', eventName)
    }

    if (startDate) {
      query = query.gte('created_at', startDate)
    }

    if (endDate) {
      query = query.lte('created_at', endDate)
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    // Calculate summary statistics
    const summary = {
      total_events: data.length,
      unique_events: [...new Set(data.map(e => e.event_name))].length,
      date_range: {
        start: data[data.length - 1]?.created_at,
        end: data[0]?.created_at
      },
      top_events: getTopEvents(data)
    }

    return NextResponse.json({ 
      success: true, 
      data,
      summary
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

function getTopEvents(events: { event_name: string }[]) {
  const counts = events.reduce((acc, event) => {
    acc[event.event_name] = (acc[event.event_name] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([event, count]) => ({ event, count }))
}
