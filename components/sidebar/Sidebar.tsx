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
  VideoIcon
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
  }
]

export const Sidebar = () => {
  const pathname = usePathname()

  return(
    <div className="flex flex-col h-full space-y-4 py-4 text-slate-200 bg-slate-800">
      <div className="flex-1 px-3 py-2">
        <Link
          className="flex items-center pl-3 mb-14"
          href="/dashboard"
        >
          <div className="relative h-10 w-10 mr-2">
            <Image
              src="/logo.png"
              alt="logo"
              fill
            />
          </div>
          <h1
            className={
              cn(
                "text-2xl font-bold",
                font.className
              )
            }
          >
            EMCube
          </h1>
        </Link>
        <div className="space-y-1">
          {
            routes.map((route) => (
              <Link
                className={
                  cn(
                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-slate-200 hover:bg-slate-200/10 rounded-lg transition",
                    pathname == route.href
                    ? "text-slate-200 bg-slate-200/10"
                    : "text-slate-400"
                  )
                }
                href={ route.href }
                key={ route.href }
              >
                <div className="flex items-center flex-1">
                  <route.icon
                    className={
                      cn(
                        "h-5 w-5 mr-3",
                        route.color
                      )
                    }
                  />
                  { route.label }
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}
