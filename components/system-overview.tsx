"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HealthGauge } from "@/components/health-gauge"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

const mockDevices = [
  {
    id: "WS-DEV-001",
    name: "WS-DEV-001",
    user: "John Smith",
    department: "Development",
    health: 92,
    status: "healthy",
  },
  {
    id: "WS-MKT-002",
    name: "WS-MKT-002",
    user: "Sarah Johnson",
    department: "Marketing",
    health: 78,
    status: "warning",
  },
  { id: "WS-FIN-003", name: "WS-FIN-003", user: "Michael Brown", department: "Finance", health: 85, status: "healthy" },
  { id: "WS-HR-004", name: "WS-HR-004", user: "Emily Davis", department: "HR", health: 45, status: "critical" },
  {
    id: "WS-DEV-005",
    name: "WS-DEV-005",
    user: "David Wilson",
    department: "Development",
    health: 88,
    status: "healthy",
  },
  {
    id: "WS-MKT-006",
    name: "WS-MKT-006",
    user: "Jessica Taylor",
    department: "Marketing",
    health: 67,
    status: "warning",
  },
]

export function SystemOverview() {
  const [filter, setFilter] = useState("all")

  const filteredDevices = filter === "all" ? mockDevices : mockDevices.filter((device) => device.department === filter)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">System Health Overview</h2>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px] bg-[#161B22] border-[#1E2430] text-white">
            <SelectValue placeholder="Filter by department" />
          </SelectTrigger>
          <SelectContent className="bg-[#161B22] border-[#1E2430] text-white">
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="Development">Development</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
            <SelectItem value="HR">HR</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDevices.map((device) => (
          <Card key={device.id} className="overflow-hidden group">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{device.name}</CardTitle>
                  <CardDescription>{device.user}</CardDescription>
                </div>
                <Badge
                  className={cn(
                    "transition-all",
                    device.status === "healthy" &&
                      "bg-gradient-to-r from-[#10B981] to-[#059669] shadow-[0_0_10px_rgba(16,185,129,0.3)]",
                    device.status === "warning" &&
                      "bg-gradient-to-r from-[#F59E0B] to-[#D97706] shadow-[0_0_10px_rgba(245,158,11,0.3)]",
                    device.status === "critical" &&
                      "bg-gradient-to-r from-[#EF4444] to-[#DC2626] shadow-[0_0_10px_rgba(239,68,68,0.3)]",
                  )}
                >
                  {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="w-24 h-24">
                  <HealthGauge value={device.health} />
                </div>
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="text-[#AAB1B7]">Department:</span>{" "}
                    <span className="text-white">{device.department}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-[#AAB1B7]">Health Score:</span>{" "}
                    <span className="text-white">{device.health}%</span>
                  </div>
                  <Link href={`/devices/${device.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:border-[#00F0FF] group-hover:text-[#00F0FF]"
                    >
                      <span>View Details</span>
                      <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
