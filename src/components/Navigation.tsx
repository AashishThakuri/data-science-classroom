import { useAuth, type AuthContextType } from '@/lib/auth'
import { Button } from '@/components/ui/button'

export default function Navigation() {
  const auth: AuthContextType = useAuth()

  return (
    <nav className="border-b bg-background fixed bottom-0 left-0 right-0 transform transition-transform duration-300 ease-in-out hover:translate-y-0 translate-y-full">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button
            variant="ghost"
            onClick={auth.signOut}
            className="text-base hover:bg-muted"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  ) 
}
