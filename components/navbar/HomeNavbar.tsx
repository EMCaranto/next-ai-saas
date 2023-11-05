'use client'

import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

// Dependencies
import { useAuth } from '@clerk/nextjs'

// Components
import { Button } from '@/components/ui/button'

// Library
import { cn } from '@/lib/utils'

const font = Montserrat({ weight: '600', subsets: ['latin'] })

export const HomeNavbar = () => {
  const { isSignedIn } = useAuth()

  return (
    <nav className="flex items-center justify-center bg-transparent p-4">
      <Link className="flex items-center" href="/">
        <div className="relative mr-4 h-16 w-16">
          <Image src="/logo.png" alt="logo" fill />
        </div>
        <h1 className={cn('text-4xl font-bold text-white', font.className)}>
          EMCube
        </h1>
      </Link>
    </nav>
  )
}
