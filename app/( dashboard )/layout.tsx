// Components
import { Navbar } from '@/components/navbar/Navbar'
import { Sidebar } from '@/components/sidebar/Sidebar'

const DashboardLayout = ({ children } : { children: React.ReactNode }) => {
  return(
    <div className="h-full relative">
      <div className="hidden h-full md:w-72 md:flex md:flex-col md:fixed md:inset-y-0 z-[80] bg-slate-800">
        <Sidebar />
      </div>
      <main className="md:pl-72">
        <Navbar />
        { children }
      </main>
    </div>
  )
}

export default DashboardLayout
