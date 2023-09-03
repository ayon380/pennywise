import './globals.css'
import type { Metadata } from 'next'
import AuthProvider from '@/components/authprovider/AuthProvider'
import localFont from 'next/font/local';
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
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
        <AuthProvider>{children}</AuthProvider> </body>
    </html>
  )
}
