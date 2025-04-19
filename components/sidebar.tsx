"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Users, Bell, Settings, BarChart3, Menu, X, BrainCircuit, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Update the navItems array to remove Device Details
const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Departments", href: "/departments", icon: Users },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Admin Controls", href: "/admin", icon: Settings },
  { name: "Business Impact", href: "/impact", icon: BarChart3 },
  { name: "AI Assistant", href: "/ai-assistant", icon: BrainCircuit },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const handleLogout = () => {
    // Clear the authentication cookie
    document.cookie = "isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    // Redirect to login page
    window.location.href = "/login";
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0D1117]/80 backdrop-blur-lg border-b border-[#1E2430]">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Logo and brand */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <BrainCircuit className="h-6 w-6 text-[#00F0FF] mr-2" />
            <span className="text-xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#00F0FF] text-transparent bg-clip-text">
              ProActiveTrack
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm rounded-md transition-all duration-300",
                pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                  ? "bg-gradient-to-r from-[#3B82F6]/10 to-[#00F0FF]/10 text-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                  : "text-[#AAB1B7] hover:text-white hover:bg-[#1E2430]",
              )}
            >
              <item.icon
                className={cn(
                  "mr-2 h-4 w-4",
                  pathname === item.href && "text-[#00F0FF] filter drop-shadow-[0_0_3px_rgba(0,240,255,0.5)]",
                )}
              />
              {item.name}
            </Link>
          ))}
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="ml-4 text-[#AAB1B7] hover:text-white hover:bg-[#1E2430]"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </nav>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md text-[#AAB1B7] hover:text-white hover:bg-[#1E2430]"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-[#0D1117]/95 backdrop-blur-lg border-t border-[#1E2430] py-2 px-4 shadow-lg">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md transition-all duration-300",
                  pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                    ? "bg-gradient-to-r from-[#3B82F6]/10 to-[#00F0FF]/10 text-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                    : "text-[#AAB1B7] hover:text-white hover:bg-[#1E2430]",
                )}
                onClick={() => setIsOpen(false)}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5",
                    pathname === item.href && "text-[#00F0FF] filter drop-shadow-[0_0_3px_rgba(0,240,255,0.5)]",
                  )}
                />
                {item.name}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 text-sm rounded-md text-[#AAB1B7] hover:text-white hover:bg-[#1E2430]"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
