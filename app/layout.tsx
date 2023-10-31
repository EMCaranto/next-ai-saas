import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

// Styles
import './styles/globals.css'

const font = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EMCube',
  description: 'A Simple AI Platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={ font.className }>
        { children }
      </body>
    </html>
  )
}
