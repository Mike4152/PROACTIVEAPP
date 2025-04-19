"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Search, Bell, Settings, User, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from "next/navigation"

export function DashboardHeader() {
  const [notifications] = useState([
    { id: 1, title: "Critical CPU usage detected", severity: "critical" },
    { id: 2, title: "Memory usage above threshold", severity: "warning" },
    { id: 3, title: "Disk space running low", severity: "warning" },
  ])

  const pathname = usePathname()
  const router = useRouter()
  const isDeviceDetailPage = pathname.startsWith("/devices/")

  const handleBack = () => {
    router.push("/")
  }

  return (
    <div className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#AAB1B7]" />
            <Input
              placeholder="Search devices..."
              className="pl-8 bg-[#161B22] border-[#1E2430] text-white focus:border-[#3B82F6] focus:ring-[#3B82F6]"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-[#AAB1B7] hover:text-white" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-[#EF4444]"></span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-[#161B22] border-[#1E2430] text-white">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#1E2430]" />
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="py-2 focus:bg-[#1E2430]">
                  <div className="flex items-center">
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full mr-2",
                        notification.severity === "critical" ? "bg-[#EF4444]" : "bg-[#F59E0B]",
                      )}
                    ></div>
                    <span>{notification.title}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5 text-[#AAB1B7] hover:text-white" />
          </Button>

          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#00F0FF] flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.3)]">
            <User className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}
