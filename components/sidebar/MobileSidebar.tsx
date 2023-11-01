'use client'

import { useEffect, useState } from 'react'

// Dependencies
import { MenuIcon } from 'lucide-react'

// Components
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { Sidebar } from '@/components/sidebar/Sidebar'

export const MobileSidebar = () => {
  const [ isMounted, setIsMounted ] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return(
    <Sheet>
      <SheetTrigger>
        <Button
          className="md:hidden"
          variant="ghost"
          size="icon"
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="p-0"
        side="left"
      >
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}
