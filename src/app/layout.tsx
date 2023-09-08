import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/app.scss'
import { NextAuthProvider } from '@/providers/sessionProvider'
import { AuthProvider } from '@/providers/authProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Checkout App',
  description: 'Checkout App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
