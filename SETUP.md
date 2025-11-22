# Course Management Setup Guide

This guide will help you set up the course management system with Supabase and Stripe integration.

## Prerequisites

1. **Supabase Account**: Create an account at [supabase.com](https://supabase.com)
2. **Stripe Account**: Create an account at [stripe.com](https://stripe.com)
3. **Clerk Account**: Already configured for authentication

## Database Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and API keys (already configured in `.env.local`)

### 2. Run Database Schema

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase/schema.sql`
4. Run the SQL script to create all tables and policies

### 3. Verify Tables

After running the schema, you should have these tables:
- `courses` - Store course information
- `enrollments` - Track user enrollments
- `payments` - Store payment records
- `course_modules` - Course content modules (for future expansion)
- `user_progress` - Track user progress through modules

## Stripe Setup

### 1. Get Stripe Keys

1. Go to your Stripe dashboard
2. Navigate to Developers > API keys
3. Copy your Publishable key and Secret key
4. Update `.env.local` with your actual Stripe keys:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key_here
STRIPE_SECRET_KEY=sk_test_your_actual_key_here
```

### 2. Set Up Webhooks

1. In Stripe dashboard, go to Developers > Webhooks
2. Click "Add endpoint"
3. Set endpoint URL to: `https://your-domain.com/api/webhooks/stripe`
4. Select these events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the webhook signing secret and update `.env.local`:

```env
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## Testing the System

### 1. Create a Test Course

1. Start the development server: `npm run dev`
2. Navigate to `/admin/courses`
3. Click "Add New Course"
4. Fill in the course details and save

### 2. Test Course Purchase

1. Navigate to `/courses`
2. Find your test course
3. Click "Purchase" or "Enroll for Free"
4. For paid courses, use Stripe test card: `4242 4242 4242 4242`

### 3. Verify Database

Check your Supabase dashboard to see:
- Course created in `courses` table
- Enrollment created in `enrollments` table
- Payment record in `payments` table (for paid courses)

## API Endpoints

The system provides these API endpoints:

### Courses
- `GET /api/courses` - List all published courses
- `GET /api/courses?includeUnpublished=true` - List all courses (admin)
- `POST /api/courses` - Create new course (admin)
- `GET /api/courses/[id]` - Get specific course
- `PUT /api/courses/[id]` - Update course (admin)
- `DELETE /api/courses/[id]` - Delete course (admin)

### Enrollments
- `GET /api/enrollments` - Get user's enrollments
- `POST /api/enrollments` - Create new enrollment

### Payments
- `POST /api/checkout` - Create Stripe checkout session
- `POST /api/webhooks/stripe` - Handle Stripe webhooks

## Admin Features

### Course Management
- Create, edit, and delete courses
- Publish/unpublish courses
- View enrollment statistics
- Manage course content and pricing

### Access Control
Currently, any authenticated user can access admin features. To implement proper admin roles:

1. Add role metadata in Clerk
2. Update API routes to check for admin role
3. Protect admin pages with role-based access

## Security Notes

1. **Row Level Security (RLS)** is enabled on all tables
2. **API routes** use Clerk authentication
3. **Stripe webhooks** verify signatures
4. **Environment variables** store sensitive keys

## Troubleshooting

### Common Issues

1. **Database connection errors**: Verify Supabase URL and keys
2. **Stripe payment failures**: Check webhook configuration
3. **Authentication issues**: Verify Clerk setup
4. **CORS errors**: Ensure proper domain configuration

### Debug Mode

Enable debug logging by adding to `.env.local`:
```env
DEBUG=true
```

## Next Steps

1. **Add course content**: Implement course modules and lessons
2. **User dashboard**: Enhance student progress tracking
3. **Certificates**: Generate completion certificates
4. **Email notifications**: Send enrollment confirmations
5. **Analytics**: Track course performance and user engagement

## Support

For issues or questions:
1. Check the console for error messages
2. Verify environment variables are set correctly
3. Test with Stripe test mode first
4. Check Supabase logs for database issues
