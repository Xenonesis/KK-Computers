// Analytics tracking utilities

type AnalyticsEvent = {
  event: string
  properties?: Record<string, unknown>
  timestamp?: string
}

class Analytics {
  private isInitialized = false

  initialize() {
    if (typeof window === 'undefined') return
    
    // Initialize analytics (Google Analytics, Mixpanel, etc.)
    this.isInitialized = true
    console.log('Analytics initialized')
  }

  track(event: string, properties?: Record<string, unknown>) {
    if (!this.isInitialized || typeof window === 'undefined') return

    const eventData: AnalyticsEvent = {
      event,
      properties,
      timestamp: new Date().toISOString()
    }

    // Send to analytics service
    console.log('Analytics Event:', eventData)

    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', event, properties)
    }

    // Custom analytics endpoint
    this.sendToServer(eventData)
  }

  page(path: string, properties?: Record<string, unknown>) {
    this.track('page_view', {
      path,
      ...properties
    })
  }

  private async sendToServer(eventData: AnalyticsEvent) {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      })
    } catch (error) {
      console.error('Failed to send analytics:', error)
    }
  }
}

export const analytics = new Analytics()

// Event tracking helpers
export const trackEvent = {
  courseView: (courseId: string, courseName: string) => {
    analytics.track('course_viewed', {
      course_id: courseId,
      course_name: courseName
    })
  },

  courseEnroll: (courseId: string, courseName: string, price: number) => {
    analytics.track('course_enrolled', {
      course_id: courseId,
      course_name: courseName,
      price
    })
  },

  searchPerformed: (query: string, results: number) => {
    analytics.track('search_performed', {
      query,
      results_count: results
    })
  },

  filterApplied: (filterType: string, filterValue: string) => {
    analytics.track('filter_applied', {
      filter_type: filterType,
      filter_value: filterValue
    })
  },

  buttonClicked: (buttonName: string, location: string) => {
    analytics.track('button_clicked', {
      button_name: buttonName,
      location
    })
  },

  videoPlayed: (videoId: string, videoTitle: string) => {
    analytics.track('video_played', {
      video_id: videoId,
      video_title: videoTitle
    })
  },

  newsletterSignup: (email: string) => {
    analytics.track('newsletter_signup', {
      email
    })
  },

  contactFormSubmit: (name: string, email: string, subject: string) => {
    analytics.track('contact_form_submit', {
      name,
      email,
      subject
    })
  },

  socialShare: (platform: string, content: string) => {
    analytics.track('social_share', {
      platform,
      content
    })
  },

  linkClicked: (linkUrl: string, linkText: string) => {
    analytics.track('link_clicked', {
      link_url: linkUrl,
      link_text: linkText
    })
  }
}

// Type declaration for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params?: Record<string, unknown>
    ) => void
  }
}
