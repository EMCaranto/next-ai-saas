'use client'

import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Dependencies
import {
  CodeIcon,
  ImageIcon,
  LayoutDashboardIcon,
  MessageSquareIcon,
  MusicIcon,
  SettingsIcon,
  VideoIcon,
} from 'lucide-react'

// Library
import { cn } from '@/lib/utils'

const font = Montserrat({ weight: '600', subsets: ['latin'] })

const routes = [
  {
    icon: LayoutDashboardIcon,
    label: 'Dashboard',
    href: '/dashboard',
    color: 'text-sky-500',
  },
  {
    icon: MessageSquareIcon,
    label: 'Conversational AI',
    href: '/conversation',
    color: 'text-orange-500',
  },
  {
    icon: ImageIcon,
    label: 'Image Generation AI',
    href: '/image',
    color: 'text-purple-500',
  },
  {
    icon: MusicIcon,
    label: 'Music Generation AI',
    href: '/music',
    color: 'text-pink-500',
  },
  {
    icon: VideoIcon,
    label: 'Video Generation AI',
    href: '/video',
    color: 'text-teal-500',
  },
  {
    icon: CodeIcon,
    label: 'Code Generator AI',
    href: '/code',
    color: 'text-emerald-500',
  },
  {
    icon: SettingsIcon,
    label: 'Settings',
    href: '/settings',
  },
]

export const Sidebar = () => {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col space-y-4 bg-slate-800 py-4 text-slate-200">
      <div className="flex-1 px-3 py-2">
        <Link className="mb-14 flex items-center pl-3" href="/dashboard">
          <div className="relative mr-2 h-10 w-10">
            <Image src="/logo.png" alt="logo" fill />
          </div>
          <h1 className={cn('text-2xl font-bold', font.className)}>EMCube</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              className={cn(
                'group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium transition hover:bg-slate-200/10 hover:text-slate-200',
                pathname == route.href
                  ? 'bg-slate-200/10 text-slate-200'
                  : 'text-slate-400'
              )}
              href={route.href}
              key={route.href}
            >
              <div className="flex flex-1 items-center">
                <route.icon className={cn('mr-3 h-5 w-5', route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
