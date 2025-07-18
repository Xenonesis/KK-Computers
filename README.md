# KK Computers - Digital Training Institute

A modern educational website built with Next.js, featuring comprehensive IT courses, student projects, events, and industry partnerships.

## 🚀 Features

- **Modern UI/UX**: Built with Next.js 15, Tailwind CSS, and ShadCN UI components
- **Authentication**: Secure user authentication with Clerk
- **Database**: Supabase integration for data management
- **Responsive Design**: Mobile-first responsive design
- **Course Management**: Comprehensive course catalog with enrollment system
- **Student Dashboard**: Personalized learning dashboard
- **Events System**: Workshop and seminar management
- **Project Showcase**: Student project gallery
- **Partner Network**: Industry partnership showcase
- **Contact System**: Contact forms and inquiry management

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, ShadCN UI
- **Authentication**: Clerk
- **Database**: Supabase
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
kk-computers/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   ├── courses/           # Courses page
│   │   ├── dashboard/         # User dashboard
│   │   ├── events/            # Events page
│   │   ├── partners/          # Partners page
│   │   ├── projects/          # Projects page
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   ├── ui/                # ShadCN UI components
│   │   └── shared/            # Shared components
│   │       ├── navbar.tsx     # Navigation bar
│   │       └── footer.tsx     # Footer
│   └── lib/
│       ├── auth.ts            # Authentication utilities
│       ├── supabase.ts        # Supabase client and types
│       └── utils.ts           # Utility functions
├── public/                     # Static assets
├── .env.local.example         # Environment variables template
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Clerk account (for authentication)
- Supabase account (for database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kk-computers
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

   Fill in your environment variables:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Next.js Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up Clerk Authentication**
   - Create a new application at [clerk.dev](https://clerk.dev)
   - Enable email/password and OAuth providers
   - Copy your publishable and secret keys to `.env.local`

5. **Set up Supabase Database**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key to `.env.local`
   - Run the database schema (coming in Phase 4)

6. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 Development Roadmap

### ✅ Phase 1: Project Setup (Completed)
- [x] Initialize Next.js project with App Router
- [x] Setup Tailwind CSS and ShadCN UI
- [x] Configure Clerk authentication
- [x] Basic Supabase connection setup

### 🔄 Phase 2: UI Structure & Routing (In Progress)
- [x] Create all page routes
- [x] Build layout components (Navbar, Footer)
- [x] Implement responsive navigation
- [ ] Add sidebar for dashboard

### 📅 Phase 3: Component Development (Upcoming)
- [ ] Build additional ShadCN components
- [ ] Integrate Framer Motion animations
- [ ] Create reusable UI components

### 📅 Phase 4: Supabase Integration (Upcoming)
- [ ] Create database schema
- [ ] Build Supabase queries and mutations
- [ ] Implement real-time listeners
- [ ] Set up protected routes

### 📅 Phase 5: Clerk Auth + Role System (Upcoming)
- [ ] Setup auth state management
- [ ] Implement user sessions
- [ ] Add admin logic for dashboard routes
- [ ] Create role-based access control

### 📅 Phase 6: UI Polish & Final Touches (Upcoming)
- [ ] Dark/light mode toggle
- [ ] Accessibility improvements
- [ ] Mobile responsiveness optimization
- [ ] SEO and metadata optimization

## 🎨 Design System

The project uses a consistent design system with:
- **Primary Color**: Blue (#2563eb)
- **Typography**: Geist Sans and Geist Mono fonts
- **Components**: ShadCN UI component library
- **Spacing**: Tailwind CSS spacing scale
- **Responsive**: Mobile-first approach

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Email: info@kkcomputers.com
- Phone: +1 (555) 123-4567
- Website: [KK Computers](http://localhost:3000)

---

Built with ❤️ by the KK Computers team
