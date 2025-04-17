"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HealthGauge } from "@/components/health-gauge"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  Search,
  ArrowLeft,
  Cpu,
  MemoryStickIcon as Memory,
  HardDrive,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Wrench,
  Database,
  Network,
  Volume2,
  Fan,
  Gauge,
  Wind,
  Download,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"

// Mock device data
const mockDevices = [
  {
    id: "WS-DEV-001",
    name: "WS-DEV-001",
    user: "John Smith",
    department: "Development",
    health: 92,
    status: "healthy",
    specs: {
      cpu: "Intel Core i7-11700K @ 3.60GHz",
      cores: 8,
      threads: 16,
      memory: "32GB DDR4 3200MHz",
      storage: "1TB NVMe SSD",
      os: "Windows 11 Pro",
      lastBoot: "2023-11-15T08:30:00Z",
    },
  },
  {
    id: "WS-MKT-002",
    name: "WS-MKT-002",
    user: "Sarah Johnson",
    department: "Marketing",
    health: 78,
    status: "warning",
    specs: {
      cpu: "AMD Ryzen 7 5800X @ 3.80GHz",
      cores: 8,
      threads: 16,
      memory: "16GB DDR4 3000MHz",
      storage: "512GB NVMe SSD",
      os: "Windows 10 Pro",
      lastBoot: "2023-11-14T09:15:00Z",
    },
  },
  {
    id: "WS-FIN-003",
    name: "WS-FIN-003",
    user: "Michael Brown",
    department: "Finance",
    health: 85,
    status: "healthy",
    specs: {
      cpu: "Intel Core i5-11600 @ 2.80GHz",
      cores: 6,
      threads: 12,
      memory: "16GB DDR4 2666MHz",
      storage: "512GB SATA SSD",
      os: "Windows 10 Pro",
      lastBoot: "2023-11-15T07:45:00Z",
    },
  },
  {
    id: "WS-HR-004",
    name: "WS-HR-004",
    user: "Emily Davis",
    department: "HR",
    health: 45,
    status: "critical",
    specs: {
      cpu: "Intel Core i5-9500 @ 3.00GHz",
      cores: 6,
      threads: 6,
      memory: "8GB DDR4 2400MHz",
      storage: "256GB SATA SSD",
      os: "Windows 10 Pro",
      lastBoot: "2023-11-13T08:00:00Z",
    },
  },
  {
    id: "WS-DEV-005",
    name: "WS-DEV-005",
    user: "David Wilson",
    department: "Development",
    health: 88,
    status: "healthy",
    specs: {
      cpu: "AMD Ryzen 9 5900X @ 3.70GHz",
      cores: 12,
      threads: 24,
      memory: "64GB DDR4 3600MHz",
      storage: "2TB NVMe SSD",
      os: "Windows 11 Pro",
      lastBoot: "2023-11-15T08:00:00Z",
    },
  },
  {
    id: "WS-MKT-006",
    name: "WS-MKT-006",
    user: "Jessica Taylor",
    department: "Marketing",
    health: 67,
    status: "warning",
    specs: {
      cpu: "Intel Core i7-10700 @ 2.90GHz",
      cores: 8,
      threads: 16,
      memory: "16GB DDR4 2933MHz",
      storage: "1TB SATA SSD",
      os: "Windows 10 Pro",
      lastBoot: "2023-11-14T10:30:00Z",
    },
  },
]

// Mock data for CPU usage over time
const cpuData = [
  { time: "00:00", value: 32 },
  { time: "01:00", value: 28 },
  { time: "02:00", value: 25 },
  { time: "03:00", value: 23 },
  { time: "04:00", value: 24 },
  { time: "05:00", value: 26 },
  { time: "06:00", value: 35 },
  { time: "07:00", value: 45 },
  { time: "08:00", value: 65 },
  { time: "09:00", value: 78 },
  { time: "10:00", value: 82 },
  { time: "11:00", value: 75 },
  { time: "12:00", value: 68 },
  { time: "13:00", value: 72 },
  { time: "14:00", value: 80 },
  { time: "15:00", value: 85 },
  { time: "16:00", value: 92 },
  { time: "17:00", value: 86 },
  { time: "18:00", value: 72 },
  { time: "19:00", value: 65 },
  { time: "20:00", value: 58 },
  { time: "21:00", value: 45 },
  { time: "22:00", value: 38 },
  { time: "23:00", value: 35 },
]

// Mock data for memory usage over time
const memoryData = [
  { time: "00:00", value: 45 },
  { time: "01:00", value: 44 },
  { time: "02:00", value: 43 },
  { time: "03:00", value: 42 },
  { time: "04:00", value: 42 },
  { time: "05:00", value: 43 },
  { time: "06:00", value: 45 },
  { time: "07:00", value: 48 },
  { time: "08:00", value: 56 },
  { time: "09:00", value: 68 },
  { time: "10:00", value: 72 },
  { time: "11:00", value: 75 },
  { time: "12:00", value: 78 },
  { time: "13:00", value: 82 },
  { time: "14:00", value: 85 },
  { time: "15:00", value: 82 },
  { time: "16:00", value: 78 },
  { time: "17:00", value: 75 },
  { time: "18:00", value: 72 },
  { time: "19:00", value: 68 },
  { time: "20:00", value: 62 },
  { time: "21:00", value: 55 },
  { time: "22:00", value: 48 },
  { time: "23:00", value: 45 },
]

// Mock data for processes
const processData = [
  { id: 1, name: "chrome.exe", cpu: 12.4, memory: 1240, disk: 0.5, network: 1.2 },
  { id: 2, name: "outlook.exe", cpu: 4.2, memory: 380, disk: 0.2, network: 0.5 },
  { id: 3, name: "teams.exe", cpu: 8.7, memory: 920, disk: 0.1, network: 2.4 },
  { id: 4, name: "excel.exe", cpu: 6.5, memory: 450, disk: 1.2, network: 0.1 },
  { id: 5, name: "word.exe", cpu: 2.1, memory: 320, disk: 0.8, network: 0.0 },
  { id: 6, name: "explorer.exe", cpu: 1.8, memory: 180, disk: 0.3, network: 0.1 },
  { id: 7, name: "svchost.exe", cpu: 0.9, memory: 120, disk: 0.1, network: 0.3 },
  { id: 8, name: "antivirus.exe", cpu: 3.2, memory: 280, disk: 0.4, network: 0.2 },
]

// Mock data for past issues
const pastIssuesData = [
  {
    id: 1,
    date: "2023-11-10",
    issue: "High CPU Usage",
    description: "CPU usage spiked to 95% for over 30 minutes",
    resolution: "Chrome browser extension causing high CPU usage was disabled",
    severity: "warning",
  },
  {
    id: 2,
    date: "2023-10-25",
    issue: "Memory Leak",
    description: "Memory usage gradually increased to 95% over 4 hours",
    resolution: "Application restart resolved the issue, software update applied",
    severity: "critical",
  },
  {
    id: 3,
    date: "2023-09-18",
    issue: "Disk Space Low",
    description: "C: drive reached 95% capacity",
    resolution: "Temporary files cleaned, freed 45GB of space",
    severity: "warning",
  },
  {
    id: 4,
    date: "2023-08-05",
    issue: "Network Connectivity Issues",
    description: "Intermittent network drops throughout the day",
    resolution: "Network adapter driver updated to latest version",
    severity: "warning",
  },
]

// Mock data for resource usage
const resourceUsageData = [
  { name: "CPU", value: 24, color: "#3B82F6" },
  { name: "Memory", value: 51, color: "#00F0FF" },
  { name: "Disk", value: 75, color: "#F59E0B" },
  { name: "Network", value: 4, color: "#10B981" },
]

interface DeviceDetailViewProps {
  deviceId: string
}

export function DeviceDetailView({ deviceId }: DeviceDetailViewProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [device, setDevice] = useState<any>(null)

  useEffect(() => {
    // In a real app, this would be an API call
    const foundDevice = mockDevices.find((d) => d.id === deviceId)
    setDevice(foundDevice || null)
  }, [deviceId])

  const filteredProcesses = processData.filter((process) =>
    process.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (!device) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <AlertTriangle className="h-16 w-16 text-[#F59E0B] mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Device Not Found</h2>
        <p className="text-[#AAB1B7] mb-6">The device you're looking for doesn't exist or has been removed.</p>
        <Link href="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Dashboard
          </Button>
        </Link>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-gradient-to-r from-[#10B981] to-[#059669] shadow-[0_0_10px_rgba(16,185,129,0.3)]"
      case "warning":
        return "bg-gradient-to-r from-[#F59E0B] to-[#D97706] shadow-[0_0_10px_rgba(245,158,11,0.3)]"
      case "critical":
        return "bg-gradient-to-r from-[#EF4444] to-[#DC2626] shadow-[0_0_10px_rgba(239,68,68,0.3)]"
      default:
        return "bg-[#3B82F6]"
    }
  }

  return (
    <>
      <div className="flex items-center mb-8">
        <Link href="/devices" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#00F0FF] text-transparent bg-clip-text">
              {device.name}
            </span>
          </h1>
          <p className="text-[#AAB1B7]">
            {device.user} • {device.department} Department
          </p>
        </div>
        <Badge className={`ml-4 ${getStatusColor(device.status)}`}>
          {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Health Score</CardTitle>
            <CardDescription>Overall system health</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-4">
            <div className="w-40 h-40">
              <HealthGauge value={device.health} />
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-[#AAB1B7]">Last updated</p>
              <p className="text-white">Today, 10:45 AM</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">System Specifications</CardTitle>
            <CardDescription>Hardware and software details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Cpu className="h-4 w-4 text-[#3B82F6] mr-2" />
                  <span className="text-[#AAB1B7]">Processor:</span>
                </div>
                <p className="text-white pl-6">{device.specs.cpu}</p>
                <p className="text-[#AAB1B7] pl-6">
                  {device.specs.cores} Cores, {device.specs.threads} Threads
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Memory className="h-4 w-4 text-[#00F0FF] mr-2" />
                  <span className="text-[#AAB1B7]">Memory:</span>
                </div>
                <p className="text-white pl-6">{device.specs.memory}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <HardDrive className="h-4 w-4 text-[#F59E0B] mr-2" />
                  <span className="text-[#AAB1B7]">Storage:</span>
                </div>
                <p className="text-white pl-6">{device.specs.storage}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Activity className="h-4 w-4 text-[#10B981] mr-2" />
                  <span className="text-[#AAB1B7]">Operating System:</span>
                </div>
                <p className="text-white pl-6">{device.specs.os}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-[#3B82F6] mr-2" />
                  <span className="text-[#AAB1B7]">Last Boot:</span>
                </div>
                <p className="text-white pl-6">{new Date(device.specs.lastBoot).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {resourceUsageData.map((resource, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{resource.name} Usage</CardTitle>
              <CardDescription>Current: {resource.value}%</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-2 bg-[#1E2430] rounded-full mb-1">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${resource.value}%`,
                    background: `linear-gradient(90deg, ${resource.color} 0%, ${resource.color}99 100%)`,
                    boxShadow: `0 0 10px ${resource.color}50`,
                  }}
                ></div>
              </div>
              <div className="text-xs text-[#AAB1B7] mt-2">
                {resource.name === "CPU" && "4.8 GHz • 8 Cores • 16 Threads"}
                {resource.name === "Memory" && "8.2 GB / 16 GB • DDR4 3200 MHz"}
                {resource.name === "Disk" && "384 GB / 512 GB • NVMe SSD"}
                {resource.name === "Network" && "4.2 Mbps / 100 Mbps • Ethernet"}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid grid-cols-6 mb-4 bg-[#161B22] p-1">
          <TabsTrigger value="performance" className="data-[state=active]:bg-[#1E2430] data-[state=active]:text-white">
            Performance
          </TabsTrigger>
          <TabsTrigger value="processes" className="data-[state=active]:bg-[#1E2430] data-[state=active]:text-white">
            Processes
          </TabsTrigger>
          <TabsTrigger value="issues" className="data-[state=active]:bg-[#1E2430] data-[state=active]:text-white">
            Past Issues
          </TabsTrigger>
          <TabsTrigger value="self-healing" className="data-[state=active]:bg-[#1E2430] data-[state=active]:text-white">
            Self-Healing
          </TabsTrigger>
          <TabsTrigger value="hardware" className="data-[state=active]:bg-[#1E2430] data-[state=active]:text-white">
            Hardware
          </TabsTrigger>
          <TabsTrigger value="updates" className="data-[state=active]:bg-[#1E2430] data-[state=active]:text-white">
            Updates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>CPU Usage (24 Hours)</CardTitle>
                <CardDescription>Processor utilization over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={cpuData}>
                      <defs>
                        <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1E2430" vertical={false} />
                      <XAxis dataKey="time" stroke="#AAB1B7" />
                      <YAxis stroke="#AAB1B7" domain={[0, 100]} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#161B22", borderColor: "#1E2430" }}
                        labelStyle={{ color: "#FFFFFF" }}
                        formatter={(value) => [`${value}%`, "CPU Usage"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#cpuGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Memory Usage (24 Hours)</CardTitle>
                  <CardDescription>RAM utilization over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={memoryData}>
                        <defs>
                          <linearGradient id="memoryGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#00F0FF" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1E2430" vertical={false} />
                        <XAxis dataKey="time" stroke="#AAB1B7" />
                        <YAxis stroke="#AAB1B7" domain={[0, 100]} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#161B22", borderColor: "#1E2430" }}
                          labelStyle={{ color: "#FFFFFF" }}
                          formatter={(value) => [`${value}%`, "Memory Usage"]}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#00F0FF"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#memoryGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resource Distribution</CardTitle>
                  <CardDescription>Current system resource allocation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={resourceUsageData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {resourceUsageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: "#161B22", borderColor: "#1E2430", color: "#FFFFFF" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="processes">
          <Card>
            <CardHeader>
              <CardTitle>Running Processes</CardTitle>
              <CardDescription>Currently running processes and resource usage</CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#AAB1B7]" />
                <Input
                  placeholder="Search processes..."
                  className="pl-8 bg-[#161B22] border-[#1E2430] text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-[#1E2430] hover:bg-[#1E2430]/50">
                    <TableHead className="text-[#AAB1B7]">Process Name</TableHead>
                    <TableHead className="text-right text-[#AAB1B7]">CPU (%)</TableHead>
                    <TableHead className="text-right text-[#AAB1B7]">Memory (MB)</TableHead>
                    <TableHead className="text-right text-[#AAB1B7]">Disk (MB/s)</TableHead>
                    <TableHead className="text-right text-[#AAB1B7]">Network (MB/s)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProcesses.map((process) => (
                    <TableRow key={process.id} className="border-[#1E2430] hover:bg-[#1E2430]/50">
                      <TableCell className="font-medium text-white">{process.name}</TableCell>
                      <TableCell className="text-right text-white">{process.cpu}</TableCell>
                      <TableCell className="text-right text-white">{process.memory}</TableCell>
                      <TableCell className="text-right text-white">{process.disk}</TableCell>
                      <TableCell className="text-right text-white">{process.network}</TableCell>
                    </TableRow>
                  ))}
                  {filteredProcesses.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-[#AAB1B7]">
                        No processes found matching your search
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues">
          <Card>
            <CardHeader>
              <CardTitle>Past Issues</CardTitle>
              <CardDescription>History of detected and resolved issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pastIssuesData.map((issue) => (
                  <div
                    key={issue.id}
                    className={`p-4 rounded-md border backdrop-blur-sm transition-all hover:shadow-lg
                      ${
                        issue.severity === "critical"
                          ? "border-[#EF4444]/30 bg-gradient-to-r from-[#EF4444]/5 to-transparent"
                          : "border-[#F59E0B]/30 bg-gradient-to-r from-[#F59E0B]/5 to-transparent"
                      }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-white">{issue.issue}</h4>
                        <p className="text-sm text-[#AAB1B7] mt-1">
                          {new Date(issue.date).toLocaleDateString()} •{" "}
                          {issue.severity === "critical" ? (
                            <span className="text-[#EF4444]">Critical</span>
                          ) : (
                            <span className="text-[#F59E0B]">Warning</span>
                          )}
                        </p>
                        <p className="text-sm mt-2 text-white/80">{issue.description}</p>
                        <div className="mt-2 p-2 bg-[#0D1117]/50 rounded border border-[#1E2430]">
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-[#10B981] mr-2" />
                            <span className="text-sm text-[#10B981]">Resolution: {issue.resolution}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center text-xs text-[#AAB1B7]">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(issue.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="self-healing">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HardDrive className="mr-2 h-5 w-5 text-[#6366F1]" />
                    Disk Optimization
                  </CardTitle>
                  <CardDescription>Defragment and optimize storage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Disk Fragmentation</span>
                      <span className="text-[#F59E0B]">12.4%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Last Optimized</span>
                      <span className="text-gray-400">14 days ago</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Estimated Time</span>
                      <span className="text-gray-400">5-10 minutes</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Wrench className="mr-2 h-4 w-4" />
                    Optimize Disk
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="mr-2 h-5 w-5 text-[#6366F1]" />
                    Registry Cleanup
                  </CardTitle>
                  <CardDescription>Clean and repair registry issues</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Registry Issues</span>
                      <span className="text-[#F59E0B]">142 found</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Last Cleaned</span>
                      <span className="text-gray-400">30 days ago</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Estimated Time</span>
                      <span className="text-gray-400">2-3 minutes</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Wrench className="mr-2 h-4 w-4" />
                    Clean Registry
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Cpu className="mr-2 h-5 w-5 text-[#6366F1]" />
                    Driver Optimization
                  </CardTitle>
                  <CardDescription>Update and optimize drivers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Outdated Drivers</span>
                      <span className="text-[#EF4444]">3 found</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Last Updated</span>
                      <span className="text-gray-400">45 days ago</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Estimated Time</span>
                      <span className="text-gray-400">5-15 minutes</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Wrench className="mr-2 h-4 w-4" />
                    Update Drivers
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Self-Repair Scripts</CardTitle>
                <CardDescription>Automated fixes for common issues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-[#121212] rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-[#6366F1]/10 text-[#6366F1] flex items-center justify-center mr-3">
                      <Database className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Clear Temporary Files</h4>
                      <p className="text-sm text-gray-400">Free up disk space by removing temporary files</p>
                    </div>
                    <Button size="sm">Run</Button>
                  </div>

                  <div className="flex items-center p-3 bg-[#121212] rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-[#6366F1]/10 text-[#6366F1] flex items-center justify-center mr-3">
                      <Network className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Reset Network Stack</h4>
                      <p className="text-sm text-gray-400">Fix common network connectivity issues</p>
                    </div>
                    <Button size="sm">Run</Button>
                  </div>

                  <div className="flex items-center p-3 bg-[#121212] rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-[#6366F1]/10 text-[#6366F1] flex items-center justify-center mr-3">
                      <Cpu className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Optimize Startup Items</h4>
                      <p className="text-sm text-gray-400">Improve boot time and system performance</p>
                    </div>
                    <Button size="sm">Run</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hardware">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Fan Profile Management</CardTitle>
                <CardDescription>Adjust cooling performance and noise levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    {
                      id: "whisper",
                      name: "Whisper Mode",
                      description: "Silent operation with minimal fan noise",
                      icon: Volume2,
                    },
                    {
                      id: "standard",
                      name: "Standard Mode",
                      description: "Balanced performance and noise levels",
                      icon: Fan,
                    },
                    {
                      id: "performance",
                      name: "Performance Mode",
                      description: "Increased cooling for demanding tasks",
                      icon: Gauge,
                    },
                    { id: "full", name: "Full Speed", description: "Maximum cooling capacity", icon: Wind },
                  ].map((profile) => (
                    <Card
                      key={profile.id}
                      className="cursor-pointer transition-all border border-gray-800 hover:border-gray-700"
                    >
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <profile.icon className="h-8 w-8 mb-2 text-[#6366F1]" />
                        <h3 className="font-medium">{profile.name}</h3>
                        <p className="text-xs text-gray-400 mt-1">{profile.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">CPU Fan Speed</label>
                      <span className="text-sm text-gray-400">60%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-2 bg-[#6366F1] rounded-full" style={{ width: "60%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Silent</span>
                      <span>Max Cooling</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Case Fan Speed</label>
                      <span className="text-sm text-gray-400">50%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-2 bg-[#6366F1] rounded-full" style={{ width: "50%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Silent</span>
                      <span>Max Cooling</span>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Reset to Default</Button>
                    <Button>Apply Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Fan Status</CardTitle>
                <CardDescription>Real-time fan speeds and temperatures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">CPU Fan</span>
                      <span className="text-sm">1850 RPM</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-2 bg-[#6366F1] rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Case Fan 1</span>
                      <span className="text-sm">1200 RPM</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-2 bg-[#6366F1] rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Case Fan 2</span>
                      <span className="text-sm">1150 RPM</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-2 bg-[#6366F1] rounded-full" style={{ width: "42%" }}></div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">CPU Temperature</span>
                      <span className="text-sm">65°C</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">GPU Temperature</span>
                      <span className="text-sm text-[#F59E0B]">72°C</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="updates">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Available Updates</CardTitle>
                  <CardDescription>Updates ready to be installed</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline">Select All</Button>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Install Selected
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Update Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Release Date</TableHead>
                    <TableHead>Priority</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: 1,
                      name: "Windows Security Update KB5032288",
                      type: "security",
                      size: "285 MB",
                      releaseDate: "2023-11-14",
                      priority: "critical",
                      description: "Addresses critical security vulnerabilities in the Windows operating system",
                    },
                    {
                      id: 2,
                      name: "Adobe Reader Update 23.006.20320",
                      type: "application",
                      size: "118 MB",
                      releaseDate: "2023-11-10",
                      priority: "high",
                      description: "Updates Adobe Reader with latest security patches and bug fixes",
                    },
                    {
                      id: 3,
                      name: "Chrome Browser Update 119.0.6045.159",
                      type: "application",
                      size: "76 MB",
                      releaseDate: "2023-11-13",
                      priority: "medium",
                      description: "Updates Chrome browser to the latest version with security improvements",
                    },
                  ].map((update) => (
                    <TableRow key={update.id}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{update.name}</div>
                          <div className="text-sm text-gray-400">{update.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {update.type === "security" && <Shield className="mr-1 h-3 w-3" />}
                          {update.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{update.size}</TableCell>
                      <TableCell>{update.releaseDate}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            update.priority === "critical"
                              ? "bg-[#EF4444]"
                              : update.priority === "high"
                                ? "bg-[#F59E0B]"
                                : "bg-[#38BDF8]"
                          }
                        >
                          {update.priority.charAt(0).toUpperCase() + update.priority.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Update History</CardTitle>
              <CardDescription>Previously installed updates</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Update Name</TableHead>
                    <TableHead>Installation Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: 1,
                      name: "Windows Security Update KB5031356",
                      installedDate: "2023-10-15",
                      status: "success",
                    },
                    {
                      id: 2,
                      name: "Adobe Reader Update 23.006.20280",
                      installedDate: "2023-10-12",
                      status: "success",
                    },
                    {
                      id: 3,
                      name: "Chrome Browser Update 118.0.5993.117",
                      installedDate: "2023-10-10",
                      status: "partial",
                    },
                  ].map((update) => (
                    <TableRow key={update.id}>
                      <TableCell className="font-medium">{update.name}</TableCell>
                      <TableCell>{update.installedDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {update.status === "success" && (
                            <Badge className="bg-[#10B981]">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Successful
                            </Badge>
                          )}
                          {update.status === "partial" && (
                            <Badge className="bg-[#F59E0B]">
                              <AlertTriangle className="mr-1 h-3 w-3" />
                              Partial
                            </Badge>
                          )}
                        </div>
                      </TableCell>
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
      </Tabs>
    </>
  )
}
