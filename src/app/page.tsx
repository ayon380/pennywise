import Image from 'next/image'
import Link from 'next/link'
export const metadata = {
  title: 'PennyWise',
}
export default function Home() {
  return (
    <>
      <Link href="/login">
        Login
      </Link>
    </>
  )
}
