import './globals.css';
import '../styles/app.scss';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastProvider } from '@/providers/toastProvider';
import { CartProvider } from '@/providers/cartProvider';
import { NextAuthProvider } from '@/providers/sessionProvider';

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
          <ToastProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </ToastProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
