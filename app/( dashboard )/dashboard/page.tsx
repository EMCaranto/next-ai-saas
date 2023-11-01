'use client'

import { useRouter } from 'next/navigation'

// Dependencies
import { ArrowRightIcon, CodeIcon, ImageIcon, MessageSquareIcon, MusicIcon, VideoIcon } from 'lucide-react'

// Components
import { Card } from '@/components/ui/card'

// Library
import { cn } from '@/lib/utils'

const tools = [
  {
    icon: MessageSquareIcon,
    label: 'Conversational AI',
    href: '/conversation',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    icon: ImageIcon,
    label: 'Image Generation AI',
    href: '/image',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: MusicIcon,
    label: 'Music Generation AI',
    href: '/music',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
  },
  {
    icon: VideoIcon,
    label: 'Video Generation AI',
    href: '/video',
    color: 'text-teal-500',
    bgColor: 'bg-teal-500/10',
  },
  {
    icon: CodeIcon,
    label: 'Code Generator AI',
    href: '/code',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  }
]

const DashboardPage = () => {
  const router = useRouter()

  return(
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the power of AI tools
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Experience and Interact with this simple AI tools
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {
          tools.map((tool) => (
            <Card
              className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
              key={ tool.href }
              onClick={ () => router.push(tool.href) }
            >
              <div className="flex items-center gap-x-4">
                <div className={
                  cn(
                    "p-2 w-fit rounded-md",
                    tool.bgColor
                  )
                }
                >
                  <tool.icon className={
                    cn(
                      "h-5 w-5",
                      tool.color
                    )
                  }
                  />
                </div>
                <div className="font-semibold">
                  { tool.label }
                </div>
              </div>
              <ArrowRightIcon className="h-5 w-5" />
            </Card>
          ))
        }
      </div>
    </div>
  )
}

export default DashboardPage
