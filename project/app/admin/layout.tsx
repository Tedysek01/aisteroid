"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Bot, 
  FileText, 
  Settings,
  Menu,
  X,
  LogOut
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Přidat Prompt", href: "/admin/add-prompt", icon: PlusCircle },
  { name: "Přidat Agenta", href: "/admin/add-agent", icon: Bot },
  { name: "Přidat Blog", href: "/admin/add-blog", icon: FileText },
  { name: "Nastavení", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Kontrola přihlášení při načtení stránky
  useEffect(() => {
    const token = Cookies.get('adminToken');
    if (!token && pathname !== '/admin' && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [pathname, router]);

  const handleLogout = () => {
    Cookies.remove('adminToken');
    router.push('/admin/login');
  };

  // Nezobrazovat sidebar na přihlašovací stránce
  if (pathname === '/admin' || pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Mobile sidebar toggle */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#1C1C1C] transform transition-transform duration-200 ease-in-out md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-center h-16 bg-[#242424]">
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-[#242424] hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Odhlášení */}
          <div className="p-4 border-t border-[#333]">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm text-gray-300 hover:bg-[#242424] hover:text-white rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Odhlásit se
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={`transition-all duration-200 ease-in-out ${
          sidebarOpen ? "md:ml-64" : "md:ml-64"
        }`}
      >
        <div className="min-h-screen text-white p-8">
          {children}
        </div>
      </main>
    </div>
  );
} 