import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { AnalyticsProvider } from '@/components/AnalyticsProvider';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KK Computers - Digital Training Institute",
  description: "Empowering youth through IT education, certifications, and practical learning. Join KK Computers for comprehensive digital training programs.",
  keywords: "IT training, digital education, computer courses, certifications, programming, web development",
  authors: [{ name: "KK Computers" }],
  openGraph: {
    title: "KK Computers - Digital Training Institute",
    description: "Empowering youth through IT education, certifications, and practical learning.",
    type: "website",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  if (localStorage.getItem('kk-computers-theme') === 'dark' || 
                      (!localStorage.getItem('kk-computers-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark')
                  } else {
                    document.documentElement.classList.remove('dark')
                  }
                } catch (e) {}
              `,
            }}
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
            storageKey="kk-computers-theme"
            enableColorScheme={true}
          >
            <AnalyticsProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1 pt-16">
                  {children}
                </main>
                <Footer />
              </div>
            </AnalyticsProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
