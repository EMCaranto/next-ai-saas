import Link from 'next/link'

// Dependencies
import { Button } from '@/components/ui/button'

const HomePage = () => {
  return (
    <div>
      <Link href="/sign-in">
        <Button>Sign In</Button>
      </Link>
      <Link href="/sign-up">
        <Button>Sign Up</Button>
      </Link>
    </div>
  )
}

export default HomePage
