'use client';
import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local';
import { SessionProvider } from 'next-auth/react';
const myFont = localFont({
  src: '/Product Sans Regular.ttf',
  display: 'swap',
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={myFont.className}>
        <SessionProvider>
          {children}</SessionProvider></body>
    </html>
  )
}
