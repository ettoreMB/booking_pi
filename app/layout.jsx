
import Header from '@/components/Header'
import './globals.css'
import { Roboto } from 'next/font/google'
import { Providers } from './providers'
import { Suspense } from 'react'
import Loading from './loading'
import Footer from '@/components/Footer'
import 'react-toastify/dist/ReactToastify.css';
import 'rsuite/dist/rsuite.min.css';

const roboto = Roboto({
  subsets: ['latin'], weight: ['400', '700'],
  style: ['normal', 'italic'],
})

export const metadata = {
  title: 'Booking',
  description: 'Booking',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <body className={`h-full ${roboto.className} pb-[4rem]`}>
          <main className="pt-20 h-full">  
          <Header />
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
            <Footer/>
          </main>
        </body>
      </Providers>
    </html>
  )
}
