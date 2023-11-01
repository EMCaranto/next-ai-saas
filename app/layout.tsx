import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

// Dependencies
import { ClerkProvider } from '@clerk/nextjs'

// Styles
import './styles/globals.css'

const font = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EMCube',
  description: 'A Simple AI Platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={ font.className }>
          { children }
        </body>
      </html>
    </ClerkProvider>
  )
}
