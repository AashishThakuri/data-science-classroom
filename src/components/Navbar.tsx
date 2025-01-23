import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Bell, User, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { useNotifications } from '@/hooks/useNotifications';
import { format } from 'date-fns';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { notifications, unreadCount, markAsRead } = useNotifications();

  const getCurrentSection = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/notes')) return 'Notes';
    if (path.includes('/resources')) return 'Resources';
    if (path.includes('/projects')) return 'Projects';
    return '';
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (!user) {
    return (
      <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-700 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto flex justify-between items-center px-4 py-3">
          <Button 
            variant="outline" 
            onClick={() => navigate('/login')}
            className="text-white border-white/20 hover:bg-white/10"
          >
            Login
          </Button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-700 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="icon"
            className="md:hidden text-white hover:text-white hover:bg-white/20 border-white/10"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center space-x-6 text-white/70">
          <span className="text-white font-medium">{getCurrentSection()}</span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-white font-bold tracking-wide hidden sm:block mr-4">KUCLASSROOM</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative text-white hover:bg-white/10"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-white/95 backdrop-blur-lg border border-purple-100">
              <DropdownMenuLabel className="text-purple-900">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-purple-100" />
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-sm text-gray-500">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={`p-4 ${!notification.read ? 'bg-purple-50' : ''} hover:bg-purple-50`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-purple-900">{notification.title}</p>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                      <p className="text-xs text-gray-400">
                        {format(new Date(notification.created_at), 'MMM d, yyyy h:mm a')}
                      </p>
                    </div>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-lg border border-purple-100">
              <DropdownMenuItem 
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;