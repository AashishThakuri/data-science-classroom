import { Link } from 'react-router-dom'
import { 
  LayoutDashboard, 
  BookOpen, 
  FolderGit2,
  BookText,
  MessageSquare
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
  { name: 'Notes', href: '/app/notes', icon: BookText },
  { name: 'Resources', href: '/app/resources', icon: BookOpen },
  { name: 'Projects', href: '/app/projects', icon: FolderGit2 },
  { name: 'Chat', href: '/app/chat', icon: MessageSquare }
]

export default function Sidebar() {
  return (
    <div className="hidden border-r border-border bg-background dark:bg-gray-900 md:block md:w-64">
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto">
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-4 pt-2">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-foreground dark:text-gray-300 hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-800 transition-colors"
                      >
                        <item.icon className="h-5 w-5 text-foreground dark:text-gray-400" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}
