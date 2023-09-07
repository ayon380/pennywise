export const dynamic = 'force-dynamic'
import Navbar from '@/components/Navbar';
import localFont from 'next/font/local';
export const metadata = {
    title: 'PennyWise',
  }
const myFont = localFont({
    src: '../Product Sans Regular.ttf',
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
                <Navbar />
                {children}
            </body>
        </html>
    )
}