// This file is frontend/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SpecProvider } from '../context/SpecContext'; // <-- Import our new Provider

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SpecForge',
  description: 'AI-powered API Specification and Documentation Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* This is the CDN fix for Tailwind */}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className={inter.className}>
        {/* Wrap the entire app in our SpecProvider */}
        <SpecProvider>
          {children}
        </SpecProvider>
      </body>
    </html>
  );
}