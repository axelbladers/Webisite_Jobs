import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'България Стажове | Bulgaria Internships Platform',
  description: 'Find the best internships and entry-level positions in Bulgaria. Connect with top companies and kickstart your career.',
  keywords: 'internships, jobs, bulgaria, students, entry-level, careers, стажове, работа',
  authors: [{ name: 'Bulgaria Internships Platform' }],
  openGraph: {
    title: 'България Стажове | Bulgaria Internships Platform',
    description: 'Find the best internships and entry-level positions in Bulgaria',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'България Стажове | Bulgaria Internships Platform',
    description: 'Find the best internships and entry-level positions in Bulgaria',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
}