import { NextResponse } from 'next/server'
import { testSupabaseConnection } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('Running diagnostics...')
    
    const diagnostics = {
      timestamp: new Date().toISOString(),
      environment: {
        nodeEnv: process.env.NODE_ENV,
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        hasClerkPublishableKey: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        hasClerkSecretKey: !!process.env.CLERK_SECRET_KEY,
      },
      network: {
        userAgent: 'kk-computers-diagnostics/1.0.0',
        internetConnectivity: null as boolean | null,
        httpbinTest: null as string | null,
      },
      supabase: {
        connectionTest: null as { success: boolean; error?: string } | null,
      },
      errors: [] as string[],
    }

    // Test Supabase connection
    console.log('Testing Supabase connection...')
    try {
      const connectionResult = await testSupabaseConnection()
      diagnostics.supabase.connectionTest = connectionResult
      
      if (!connectionResult.success) {
        diagnostics.errors.push(`Supabase connection failed: ${connectionResult.error}`)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      diagnostics.errors.push(`Supabase connection test error: ${errorMessage}`)
      diagnostics.supabase.connectionTest = {
        success: false,
        error: errorMessage
      }
    }

    // Test basic network connectivity
    console.log('Testing network connectivity...')
    try {
      // Try to resolve DNS for a known good domain
      const response = await fetch('https://httpbin.org/get', {
        method: 'GET',
        headers: {
          'User-Agent': 'kk-computers-diagnostics/1.0.0',
        },
        signal: AbortSignal.timeout(5000), // 5 second timeout
      })
      
      if (response.ok) {
        diagnostics.network = {
          ...diagnostics.network,
          internetConnectivity: true,
          httpbinTest: 'success',
        }
      } else {
        diagnostics.network = {
          ...diagnostics.network,
          internetConnectivity: false,
          httpbinTest: `failed with status ${response.status}`,
        }
        diagnostics.errors.push(`Network test failed: HTTP ${response.status}`)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      diagnostics.network = {
        ...diagnostics.network,
        internetConnectivity: false,
        httpbinTest: `error: ${errorMessage}`,
      }
      diagnostics.errors.push(`Network test error: ${errorMessage}`)
    }

    console.log('Diagnostics completed:', diagnostics)

    return NextResponse.json(diagnostics, {
      status: diagnostics.errors.length > 0 ? 207 : 200, // 207 Multi-Status for partial success
    })
  } catch (error) {
    console.error('Diagnostics error:', error)
    return NextResponse.json({
      error: 'Diagnostics failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 })
  }
}
