// Components
import { HomeHero } from '@/components/hero/HomeHero'
import { HomeNavbar } from '@/components/navbar/HomeNavbar'

const HomePage = () => {
  return (
    <div className="h-full">
      <HomeNavbar />
      <HomeHero />
    </div>
  )
}

export default HomePage
