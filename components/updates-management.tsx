"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, Shield, Clock, Calendar, CheckCircle, AlertTriangle, RotateCw } from "lucide-react"

// Mock data for available updates
const availableUpdates = [
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
  {
    id: 4,
    name: "Microsoft Office Update",
    type: "application",
    size: "325 MB",
    releaseDate: "2023-11-08",
    priority: "medium",
    description: "Updates Microsoft Office suite with latest features and security fixes",
  },
  {
    id: 5,
    name: "Windows Feature Update 22H2",
    type: "feature",
    size: "3.2 GB",
    releaseDate: "2023-10-25",
    priority: "low",
    description: "Major Windows feature update with new capabilities and improvements",
  },
]

// Mock data for update history
const updateHistory = [
  {
    id: 1,
    name: "Windows Security Update KB5031356",
    installedDate: "2023-10-15",
    status: "success",
    devices: 156,
  },
  {
    id: 2,
    name: "Adobe Reader Update 23.006.20280",
    installedDate: "2023-10-12",
    status: "success",
    devices: 142,
  },
  {
    id: 3,
    name: "Chrome Browser Update 118.0.5993.117",
    installedDate: "2023-10-10",
    status: "partial",
    devices: 138,
    failedDevices: 12,
  },
  {
    id: 4,
    name: "Windows Security Update KB5031190",
    installedDate: "2023-09-28",
    status: "success",
    devices: 156,
  },
  {
    id: 5,
    name: "Microsoft Office Security Update",
    installedDate: "2023-09-22",
    status: "failed",
    devices: 0,
    failedDevices: 156,
  },
]

export function UpdatesManagement() {
  const [selectedUpdates, setSelectedUpdates] = useState<number[]>([])
  const [installing, setInstalling] = useState(false)
  const [installProgress, setInstallProgress] = useState(0)

  const toggleUpdate = (id: number) => {
    setSelectedUpdates((prev) => (prev.includes(id) ? prev.filter((updateId) => updateId !== id) : [...prev, id]))
  }

  const selectAll = () => {
    if (selectedUpdates.length === availableUpdates.length) {
      setSelectedUpdates([])
    } else {
      setSelectedUpdates(availableUpdates.map((update) => update.id))
    }
  }

  const installUpdates = () => {
    if (selectedUpdates.length === 0) return

    setInstalling(true)
    setInstallProgress(0)

    const interval = setInterval(() => {
      setInstallProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setInstalling(false)
          return 100
        }
        return prev + 5
      })
    }, 300)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="available" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="available">Available Updates</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Updates</TabsTrigger>
          <TabsTrigger value="history">Update History</TabsTrigger>
        </TabsList>

        <TabsContent value="available">
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Available Updates</CardTitle>
                  <CardDescription>Updates ready to be installed</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" onClick={selectAll}>
                    {selectedUpdates.length === availableUpdates.length ? "Deselect All" : "Select All"}
                  </Button>
                  <Button onClick={installUpdates} disabled={selectedUpdates.length === 0 || installing}>
                    {installing ? (
                      <>
                        <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                        Installing...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Install Selected
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {installing && (
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Installing updates...</span>
                    <span>{installProgress}%</span>
                  </div>
                  <Progress value={installProgress} className="h-2" />
                </div>
              )}
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
                  {availableUpdates.map((update) => (
                    <TableRow key={update.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedUpdates.includes(update.id)}
                          onCheckedChange={() => toggleUpdate(update.id)}
                          disabled={installing}
                        />
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
                                : update.priority === "medium"
                                  ? "bg-[#38BDF8]"
                                  : "bg-[#94A3B8]"
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
        </TabsContent>

        <TabsContent value="scheduled">
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardHeader>
              <CardTitle>Scheduled Updates</CardTitle>
              <CardDescription>Updates scheduled for installation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-[#0F172A] p-4 rounded-lg border border-[#334155]">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-[#38BDF8]" />
                      Weekly Security Updates
                    </h4>
                    <Badge className="bg-[#10B981]">Active</Badge>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    Automatically installs security updates every Sunday at 3:00 AM
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-400">
                      <Clock className="mr-1 h-3 w-3" />
                      Next run: Sunday, 3:00 AM
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive">
                        Disable
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0F172A] p-4 rounded-lg border border-[#334155]">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-[#38BDF8]" />
                      Monthly Feature Updates
                    </h4>
                    <Badge className="bg-[#10B981]">Active</Badge>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    Installs feature updates on the first Saturday of each month at 2:00 AM
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-400">
                      <Clock className="mr-1 h-3 w-3" />
                      Next run: December 2, 2:00 AM
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive">
                        Disable
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0F172A] p-4 rounded-lg border border-[#334155]">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-[#38BDF8]" />
                      Application Updates
                    </h4>
                    <Badge className="bg-[#94A3B8]">Disabled</Badge>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    Updates third-party applications every Wednesday at 1:00 AM
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-400">
                      <Clock className="mr-1 h-3 w-3" />
                      Currently disabled
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm">Enable</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule New Update
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="bg-[#1E293B] border-[#334155]">
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
                    <TableHead>Devices</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {updateHistory.map((update) => (
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
                          {update.status === "failed" && (
                            <Badge className="bg-[#EF4444]">
                              <AlertTriangle className="mr-1 h-3 w-3" />
                              Failed
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {update.status === "success" && <span>{update.devices} devices</span>}
                        {update.status === "partial" && (
                          <span>
                            {update.devices} of {update.devices + update.failedDevices} devices
                          </span>
                        )}
                        {update.status === "failed" && <span>0 of {update.failedDevices} devices</span>}
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
    </div>
  )
}
