// Dependencies
import { UserButton } from '@clerk/nextjs'

// Components
import { MobileSidebar } from '@/components/sidebar/MobileSidebar'

export const Navbar = () => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}
