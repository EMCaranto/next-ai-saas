'use client'

import Link from 'next/link'

// Dependencies
import { useAuth } from '@clerk/nextjs'
import TypewriterComponent from 'typewriter-effect'

// Components
import { Button } from '@/components/ui/button'

export const HomeHero = () => {
  const { isSignedIn } = useAuth()

  return (
    <div className="space-y-5 py-36 text-center font-bold text-white">
      <div className="space-y-5 text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">
        <h1>A simple AI tools for</h1>
        <div className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text py-6 text-transparent">
          <TypewriterComponent
            options={{
              strings: [
                'Chatbot',
                'Image Generation',
                'Music Generation',
                'Video Generation',
                'Code Generation',
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm font-light text-slate-400 md:text-xl">
        Create content using this simple AI tools
      </div>
      <div>
        <Link href={isSignedIn ? '/dashboard' : 'sign-up'}>
          <Button
            className="rounded-full p-4 font-semibold md:p-6 md:text-lg"
            variant="fancy"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  )
}
