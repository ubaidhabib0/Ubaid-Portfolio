import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ubaid Ullah | Software Engineer Portfolio',
  description: 'Professional software engineering portfolio of Ubaid Ullah. Specializing in full-stack MERN development, Next.js, P2P blockchain systems, and AI-powered repository auditing (DevGuard AI).',
  keywords: ['Ubaid Ullah', 'Software Engineer', 'Portfolio', 'Full Stack Developer', 'Blockchain Developer', 'DevGuard AI', 'AUST', 'Next.js Portfolio'],
  authors: [{ name: 'Ubaid Ullah' }]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#03001e] min-h-screen text-slate-100`}>
        {children}
      </body>
    </html>
  );
}
