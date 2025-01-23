import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import AuthGuard from '@/components/AuthGuard'
import Navigation from '@/components/Navigation'

export default function Layout() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background dark:bg-gray-900 transition-colors">
        <Navigation />
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
