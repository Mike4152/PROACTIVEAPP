"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Thermometer, Fan, Zap, Search } from "lucide-react"

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

// Mock data for temperature over time
const temperatureData = [
  { time: "00:00", value: 42 },
  { time: "01:00", value: 40 },
  { time: "02:00", value: 39 },
  { time: "03:00", value: 38 },
  { time: "04:00", value: 38 },
  { time: "05:00", value: 39 },
  { time: "06:00", value: 41 },
  { time: "07:00", value: 45 },
  { time: "08:00", value: 52 },
  { time: "09:00", value: 58 },
  { time: "10:00", value: 65 },
  { time: "11:00", value: 68 },
  { time: "12:00", value: 72 },
  { time: "13:00", value: 75 },
  { time: "14:00", value: 78 },
  { time: "15:00", value: 76 },
  { time: "16:00", value: 74 },
  { time: "17:00", value: 72 },
  { time: "18:00", value: 68 },
  { time: "19:00", value: 64 },
  { time: "20:00", value: 58 },
  { time: "21:00", value: 52 },
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

// Mock data for hardware health
const hardwareData = {
  fans: [
    { id: 1, name: "CPU Fan", rpm: 1850, status: "normal" },
    { id: 2, name: "Case Fan 1", rpm: 1200, status: "normal" },
    { id: 3, name: "Case Fan 2", rpm: 1150, status: "normal" },
  ],
  temperatures: [
    { id: 1, name: "CPU", value: 65, unit: "°C", status: "normal" },
    { id: 2, name: "GPU", value: 72, unit: "°C", status: "warning" },
    { id: 3, name: "Motherboard", value: 45, unit: "°C", status: "normal" },
  ],
  voltages: [
    { id: 1, name: "CPU Core", value: 1.25, unit: "V", status: "normal" },
    { id: 2, name: "3.3V Rail", value: 3.28, unit: "V", status: "normal" },
    { id: 3, name: "5V Rail", value: 5.05, unit: "V", status: "normal" },
    { id: 4, name: "12V Rail", value: 11.89, unit: "V", status: "normal" },
  ],
}

export function DeviceDetails() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProcesses = processData.filter((process) =>
    process.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#1E1E1E] border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">CPU Usage</CardTitle>
            <CardDescription>Current: 24%</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-2 bg-gray-700 rounded-full mb-1">
              <div className="h-2 bg-[#6366F1] rounded-full" style={{ width: "24%" }}></div>
            </div>
            <div className="text-xs text-gray-400">4.8 GHz • 8 Cores • 16 Threads</div>
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E1E] border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Memory</CardTitle>
            <CardDescription>8.2 GB / 16 GB</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-2 bg-gray-700 rounded-full mb-1">
              <div className="h-2 bg-[#6366F1] rounded-full" style={{ width: "51%" }}></div>
            </div>
            <div className="text-xs text-gray-400">DDR4 • 3200 MHz</div>
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E1E] border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Disk Space</CardTitle>
            <CardDescription>256 GB / 512 GB</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-2 bg-gray-700 rounded-full mb-1">
              <div className="h-2 bg-[#F59E0B] rounded-full" style={{ width: "75%" }}></div>
            </div>
            <div className="text-xs text-gray-400">NVMe SSD • 3500 MB/s</div>
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E1E] border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Network</CardTitle>
            <CardDescription>4.2 Mbps / 100 Mbps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-2 bg-gray-700 rounded-full mb-1">
              <div className="h-2 bg-[#6366F1] rounded-full" style={{ width: "4%" }}></div>
            </div>
            <div className="text-xs text-gray-400">Ethernet • 1 Gbps</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="performance">Performance History</TabsTrigger>
          <TabsTrigger value="processes">Running Processes</TabsTrigger>
          <TabsTrigger value="hardware">Hardware Health</TabsTrigger>
        </TabsList>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-[#1E1E1E] border-gray-800">
              <CardHeader>
                <CardTitle>CPU Usage (24 Hours)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={cpuData}>
                      <defs>
                        <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#6366F1" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                      <XAxis dataKey="time" stroke="#666" />
                      <YAxis stroke="#666" domain={[0, 100]} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1E1E1E", borderColor: "#333" }}
                        labelStyle={{ color: "#F3F4F6" }}
                        formatter={(value) => [`${value}%`, "CPU Usage"]}
                      />
                      <Area type="monotone" dataKey="value" stroke="#6366F1" fillOpacity={1} fill="url(#cpuGradient)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-[#1E1E1E] border-gray-800">
                <CardHeader>
                  <CardTitle>Memory Usage (24 Hours)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={memoryData}>
                        <defs>
                          <linearGradient id="memoryGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis dataKey="time" stroke="#666" />
                        <YAxis stroke="#666" domain={[0, 100]} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#1E1E1E", borderColor: "#333" }}
                          labelStyle={{ color: "#F3F4F6" }}
                          formatter={(value) => [`${value}%`, "Memory Usage"]}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#10B981"
                          fillOpacity={1}
                          fill="url(#memoryGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1E1E1E] border-gray-800">
                <CardHeader>
                  <CardTitle>Temperature (24 Hours)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={temperatureData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis dataKey="time" stroke="#666" />
                        <YAxis stroke="#666" domain={[30, 90]} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#1E1E1E", borderColor: "#333" }}
                          labelStyle={{ color: "#F3F4F6" }}
                          formatter={(value) => [`${value}°C`, "Temperature"]}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#EF4444"
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="processes">
          <Card className="bg-[#1E1E1E] border-gray-800">
            <CardHeader>
              <CardTitle>Running Processes</CardTitle>
              <CardDescription>Currently running processes and resource usage</CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search processes..."
                  className="pl-8 bg-[#121212] border-gray-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Process Name</TableHead>
                    <TableHead className="text-right">CPU (%)</TableHead>
                    <TableHead className="text-right">Memory (MB)</TableHead>
                    <TableHead className="text-right">Disk (MB/s)</TableHead>
                    <TableHead className="text-right">Network (MB/s)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProcesses.map((process) => (
                    <TableRow key={process.id}>
                      <TableCell className="font-medium">{process.name}</TableCell>
                      <TableCell className="text-right">{process.cpu}</TableCell>
                      <TableCell className="text-right">{process.memory}</TableCell>
                      <TableCell className="text-right">{process.disk}</TableCell>
                      <TableCell className="text-right">{process.network}</TableCell>
                    </TableRow>
                  ))}
                  {filteredProcesses.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-gray-400">
                        No processes found matching your search
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hardware">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[#1E1E1E] border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Fan className="mr-2 h-5 w-5 text-[#6366F1]" />
                  Fan Speeds
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hardwareData.fans.map((fan) => (
                    <div key={fan.id} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{fan.name}</div>
                        <div className="text-sm text-gray-400">{fan.rpm} RPM</div>
                      </div>
                      <Badge className={fan.status === "normal" ? "bg-[#10B981]" : "bg-[#F59E0B]"}>{fan.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1E1E1E] border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Thermometer className="mr-2 h-5 w-5 text-[#EF4444]" />
                  Temperatures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hardwareData.temperatures.map((temp) => (
                    <div key={temp.id} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{temp.name}</div>
                        <div className="text-sm text-gray-400">
                          {temp.value} {temp.unit}
                        </div>
                      </div>
                      <Badge className={temp.status === "normal" ? "bg-[#10B981]" : "bg-[#F59E0B]"}>
                        {temp.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1E1E1E] border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-[#F59E0B]" />
                  Voltages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hardwareData.voltages.map((voltage) => (
                    <div key={voltage.id} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{voltage.name}</div>
                        <div className="text-sm text-gray-400">
                          {voltage.value} {voltage.unit}
                        </div>
                      </div>
                      <Badge className={voltage.status === "normal" ? "bg-[#10B981]" : "bg-[#F59E0B]"}>
                        {voltage.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
