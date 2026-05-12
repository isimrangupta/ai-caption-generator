import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const geist = Geist({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Caption Generator',
  description: 'Generate AI captions for your images',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.className}  min-h-screen`}>
        <Navbar />
        <main>
          {children}
        </main>
<Footer/>
      </body>
    </html>
  )
}