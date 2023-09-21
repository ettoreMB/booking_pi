import Header from '@/components/Header'
import './globals.css'
import { Roboto } from 'next/font/google'
import { Providers } from './providers'

import Footer from '@/components/Footer'
import 'react-toastify/dist/ReactToastify.css'
import 'rsuite/dist/rsuite.min.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
})

export const metadata = {
  title: 'Booking',
  description: 'Booking',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="antialiased">
      <Providers>
        <body className={` ${roboto.className}`}>
          <main className="min-h-screen grid grid-rows-app">
            <Header />
            <div className="pt-16  pb-20 h-fit">{children}</div>
            {/* <Footer /> */}
          </main>
        </body>
      </Providers>
    </html>
  )
}
