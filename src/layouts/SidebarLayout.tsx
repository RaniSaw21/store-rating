import { Outlet, useNavigate } from 'react-router-dom';
import { LogOut, Menu, Store, Users, LayoutDashboard, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import Button from '../components/common/Button';

export default function SidebarLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: getDashboardPath() },
    ...(user?.role === 'ADMIN' ? [{ icon: Users, label: 'Users', path: '/admin/users' }] : []),
    ...(user?.role === 'ADMIN' ? [{ icon: Store, label: 'Stores', path: '/admin/stores' }] : []),
    ...(user?.role === 'USER' ? [{ icon: Store, label: 'Stores', path: '/user/stores' }] : []),
    { icon: User, label: 'Profile', path: getProfilePath() },
  ];

  function getDashboardPath() {
    switch (user?.role) {
      case 'ADMIN': return '/admin/dashboard';
      case 'STORE_OWNER': return '/owner/dashboard';
      default: return '/user/dashboard';
    }
  }

  function getProfilePath() {
    switch (user?.role) {
      case 'ADMIN': return '/admin/profile';
      case 'STORE_OWNER': return '/owner/profile';
      default: return '/user/profile';
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 border-r border-gray-200 bg-white p-4 lg:block">
        <div className="mb-8 flex items-center gap-2">
          <Store className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-gray-900">StoreRating</span>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4">
          <Button variant="ghost" onClick={handleLogout} className="w-full justify-start">
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-6">
        <div className="lg:hidden mb-4 flex items-center justify-between">
          <button className="p-2">
            <Menu className="h-6 w-6" />
          </button>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
