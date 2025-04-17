"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Clock } from "lucide-react"

// Mock data for departments
const departments = [
  { id: 1, name: "Development", devices: 42, healthy: 35, warning: 5, critical: 2, avgHealth: 87 },
  { id: 2, name: "Marketing", devices: 28, healthy: 22, warning: 6, critical: 0, avgHealth: 84 },
  { id: 3, name: "Finance", devices: 18, healthy: 16, warning: 1, critical: 1, avgHealth: 91 },
  { id: 4, name: "HR", devices: 12, healthy: 8, warning: 3, critical: 1, avgHealth: 78 },
  { id: 5, name: "Operations", devices: 32, healthy: 25, warning: 5, critical: 2, avgHealth: 82 },
  { id: 6, name: "Sales", devices: 24, healthy: 20, warning: 3, critical: 1, avgHealth: 85 },
]

// Mock data for devices in a department
const devicesData = [
  { id: 1, name: "WS-DEV-001", user: "John Smith", health: 92, status: "healthy", lastIssue: "None" },
  { id: 2, name: "WS-DEV-002", user: "Emma Johnson", health: 78, status: "warning", lastIssue: "High memory usage" },
  { id: 3, name: "WS-DEV-003", user: "Michael Brown", health: 95, status: "healthy", lastIssue: "None" },
  {
    id: 4,
    name: "WS-DEV-004",
    user: "Emily Davis",
    health: 45,
    status: "critical",
    lastIssue: "Disk failure imminent",
  },
  { id: 5, name: "WS-DEV-005", user: "David Wilson", health: 88, status: "healthy", lastIssue: "None" },
  { id: 6, name: "WS-DEV-006", user: "Jessica Taylor", health: 67, status: "warning", lastIssue: "Outdated drivers" },
  { id: 7, name: "WS-DEV-007", user: "Robert Miller", health: 91, status: "healthy", lastIssue: "None" },
  { id: 8, name: "WS-DEV-008", user: "Sarah Anderson", health: 84, status: "healthy", lastIssue: "None" },
]

// Mock data for health distribution
const healthDistributionData = [
  { name: "Healthy", value: 126, color: "#10B981" },
  { name: "Warning", value: 23, color: "#F59E0B" },
  { name: "Critical", value: 7, color: "#EF4444" },
]

// Mock data for department comparison
const departmentComparisonData = departments.map((dept) => ({
  name: dept.name,
  avgHealth: dept.avgHealth,
}))

export function DepartmentView() {
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {departments.map((dept) => (
          <Card
            key={dept.id}
            className={`bg-[#1E293B] border-[#334155] cursor-pointer transition-all ${
              selectedDepartment.id === dept.id ? "ring-2 ring-[#38BDF8]" : ""
            }`}
            onClick={() => setSelectedDepartment(dept)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Users className="mr-2 h-5 w-5 text-[#38BDF8]" />
                {dept.name}
              </CardTitle>
              <CardDescription>{dept.devices} devices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-[#10B981] mr-2"></div>
                    <span className="text-sm">{dept.healthy} Healthy</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-[#F59E0B] mr-2"></div>
                    <span className="text-sm">{dept.warning} Warning</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-[#EF4444] mr-2"></div>
                    <span className="text-sm">{dept.critical} Critical</span>
                  </div>
                </div>
                <div className="h-16 w-16 rounded-full border-4 border-[#38BDF8] flex items-center justify-center">
                  <span className="text-lg font-bold">{dept.avgHealth}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="overview">Department Overview</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="comparison">Department Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#1E293B] border-[#334155]">
              <CardHeader>
                <CardTitle>Health Distribution</CardTitle>
                <CardDescription>Overall health status of devices in {selectedDepartment.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={healthDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {healthDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1E293B] border-[#334155]">
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>Latest issues in {selectedDepartment.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-md border border-l-4 border-l-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Critical CPU usage detected</h4>
                        <p className="text-sm text-gray-400 mt-1">WS-DEV-004 • Emily Davis</p>
                      </div>
                      <div className="flex items-center text-xs text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        10 minutes ago
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-md border border-l-4 border-l-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Memory usage above threshold</h4>
                        <p className="text-sm text-gray-400 mt-1">WS-DEV-002 • Emma Johnson</p>
                      </div>
                      <div className="flex items-center text-xs text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        25 minutes ago
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-md border border-l-4 border-l-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Outdated drivers detected</h4>
                        <p className="text-sm text-gray-400 mt-1">WS-DEV-006 • Jessica Taylor</p>
                      </div>
                      <div className="flex items-center text-xs text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />1 hour ago
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-[#1E293B] border-[#334155] mt-6">
            <CardHeader>
              <CardTitle>Department Health Metrics</CardTitle>
              <CardDescription>Key performance indicators for {selectedDepartment.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#0F172A] p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-[#38BDF8]">{selectedDepartment.avgHealth}%</div>
                  <div className="text-sm font-medium mt-1">Average Health</div>
                  <div className="text-xs text-gray-400 mt-1">+2% from last week</div>
                </div>

                <div className="bg-[#0F172A] p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-[#10B981]">98.2%</div>
                  <div className="text-sm font-medium mt-1">Uptime</div>
                  <div className="text-xs text-gray-400 mt-1">Last 30 days</div>
                </div>

                <div className="bg-[#0F172A] p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-[#F59E0B]">12</div>
                  <div className="text-sm font-medium mt-1">Issues Resolved</div>
                  <div className="text-xs text-gray-400 mt-1">This month</div>
                </div>

                <div className="bg-[#0F172A] p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-[#38BDF8]">8.5</div>
                  <div className="text-sm font-medium mt-1">Avg. Response Time</div>
                  <div className="text-xs text-gray-400 mt-1">Minutes per issue</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices">
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardHeader>
              <CardTitle>Devices in {selectedDepartment.name}</CardTitle>
              <CardDescription>All devices and their current status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device Name</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Health Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Issue</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {devicesData.map((device) => (
                    <TableRow key={device.id}>
                      <TableCell className="font-medium">{device.name}</TableCell>
                      <TableCell>{device.user}</TableCell>
                      <TableCell>{device.health}%</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            device.status === "healthy"
                              ? "bg-[#10B981]"
                              : device.status === "warning"
                                ? "bg-[#F59E0B]"
                                : "bg-[#EF4444]"
                          }
                        >
                          {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{device.lastIssue}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison">
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardHeader>
              <CardTitle>Department Health Comparison</CardTitle>
              <CardDescription>Average health scores across all departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="name" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: "#1E293B", borderColor: "#334155" }} />
                    <Bar dataKey="avgHealth" name="Average Health Score" fill="#38BDF8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
