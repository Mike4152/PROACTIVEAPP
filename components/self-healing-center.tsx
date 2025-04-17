"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Wrench,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  RotateCw,
  HardDrive,
  Database,
  Cpu,
  Network,
} from "lucide-react"

export function SelfHealingCenter() {
  const [optimizingDisk, setOptimizingDisk] = useState(false)
  const [diskProgress, setDiskProgress] = useState(0)
  const [optimizingRegistry, setOptimizingRegistry] = useState(false)
  const [registryProgress, setRegistryProgress] = useState(0)
  
  const startDiskOptimization = () => {
    setOptimizingDisk(true)
    setDiskProgress(0)
    
    const interval = setInterval(() => {
      setDiskProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setOptimizingDisk(false)
          return 100
        }
        return prev + 5
      })
    }, 300)
  }
  
  const startRegistryOptimization = () => {
    setOptimizingRegistry(true)
    setRegistryProgress(0)
    
    const interval = setInterval(() => {
      setRegistryProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setOptimizingRegistry(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="optimization" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="optimization">System Optimization</TabsTrigger>
          <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
          <TabsTrigger value="maintenance">Scheduled Maintenance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="optimization">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[#1E1E1E] border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HardDrive className="mr-2 h-5 w-5 text-[#6366F1]" />
                  Disk Optimization
                </CardTitle>
                <CardDescription>
                  Defragment and optimize storage
                </CardDescription>
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
                  
                  {optimizingDisk && (
                    <div className="space-y-2 mt-4">
                      <div className="flex justify-between text-sm">
                        <span>Optimizing...</span>
                        <span>{diskProgress}%</span>
                      </div>
                      <Progress value={diskProgress} className="h-2" />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={startDiskOptimization}
                  disabled={optimizingDisk}
                >
                  {optimizingDisk ? (
                    <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Wrench className="mr-2 h-4 w-4" />
                  )}
                  {optimizingDisk ? "Optimizing..." : "Optimize Disk"}
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-[#1E1E1E] border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="mr-2 h-5 w-5 text-[#6366F1]" />
                  Registry Cleanup
                </CardTitle>
                <CardDescription>
                  Clean and repair registry issues
                </CardDescription>
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
                  
                  {optimizingRegistry && (
                    <div className="space-y-2 mt-4">
                      <div className="flex justify-between text-sm">
                        <span>Cleaning...</span>
                        <span>{registryProgress}%</span>
                      </div>
                      <Progress value={registryProgress} className="h-2" />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={startRegistryOptimization}
                  disabled={optimizingRegistry}
                >
                  {optimizingRegistry ? (
                    <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Wrench className="mr-2 h-4 w-4" />
                  )}
                  {optimizingRegistry ? "Cleaning..." : "Clean Registry"}
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-[#1E1E1E] border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Cpu className="mr-2 h-5 w-5 text-[#6366F1]" />
                  Driver Optimization
                </CardTitle>
                <CardDescription>
                  Update and optimize drivers
                </CardDescription>
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
          
          <Card className="bg-[#1E1E1E] border-gray-800 mt-6">
            <CardHeader>
              <CardTitle>Success Metrics</CardTitle>
              <CardDescription>
                Downtime prevented and productivity recovered
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#121212] p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-[#10B981]">24.5</div>
                  <div className="text-sm font-medium mt-1">Hours Saved</div>
                  <div className="text-xs text-gray-400 mt-1">This Month</div>
                </div>
                
                <div className="bg-[#121212] p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-[#6366F1]">87</div>
                  <div className="text-sm font-medium mt-1">Issues Fixed</div>
                  <div className="text-xs text-gray-400 mt-1">Automatically</div>
                </div>
                
                <div className="bg-[#121212] p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-[#F59E0B]">12%</div>
                  <div className="text-sm font-medium mt-1">Performance Gain</div>
                  <div className="text-xs text-gray-400 mt-1">Average</div>
                </div>
                
                <div className="bg-[#121212] p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-[#EF4444]">94%</div>
                  <div className="text-sm font-medium mt-1">Success Rate</div>
                  <div className="text-xs text-gray-400 mt-1">Self-Healing</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="troubleshooting">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#1E1E1E] border-gray-800">
              <CardHeader>
                <CardTitle>Automated Troubleshooting</CardTitle>
                <CardDescription>
                  Diagnose and fix common issues automatically
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-[#121212] p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium flex items-center">
                        <Network className="mr-2 h-4 w-4 text-[#6366F1]" />
                        Network Connectivity
                      </h4>
                      <Badge className="bg-[#10B981]">Healthy</Badge>
                    </div>
                    <p className="text-sm text-gray-400">
                      All network services are functioning properly
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Run Diagnostics
                    </Button>
                  </div>
                  
                  <div className="bg-[#121212] p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium flex items-center">
                        <HardDrive className="mr-2 h-4 w-4 text-[#F59E0B]" />
                        Storage Health
                      </h4>
                      <Badge className="bg-[#F59E0B]">Warning</Badge>
                    </div>
                    <p className="text-sm text-gray-400">
                      Disk space running low (15% remaining)
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Fix Issues
                    </Button>
                  </div>
                  
                  <div className="bg-[#121212] p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium flex items-center">
                        <Cpu className="mr-2 h-4 w-4 text-[#10B981]" />
                        System Performance
                      </h4>
                      <Badge className="bg-[#10B981]">Healthy</Badge>
                    </div>
                    <p className="text-sm text-gray-400">
                      System is performing within optimal parameters
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Run Diagnostics
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#1E1E1E] border-gray-800">
              <CardHeader>
                <CardTitle>Self-Repair Scripts</CardTitle>
                <CardDescription>
                  Automated fixes for common issues
                </CardDescription>
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
                  
                  <div className="flex items-center p-3 bg-[#121212] rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-[#6366F1]/10 text-[#6366F1] flex items-center justify-center mr-3">
                      <HardDrive className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Repair Disk Permissions</h4>
                      <p className="text-sm text-gray-400">Fix file access and application issues</p>
                    </div>
                    <Button size="sm">Run</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="maintenance">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[#1E1E1E] border-gray-800 md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-[#6366F1]" />
                  Maintenance Schedule
                </CardTitle>
                <CardDescription>
                  Upcoming automated maintenance tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-[#121212] p-4 rounded-lg border-l-4 border-[#6366F1]">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">Weekly System Optimization</h4>
                      <Badge variant="outline">Recurring</Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-400 mb-2">
                      <Clock className="mr-1 h-4 w-4" />
                      Next run in 2 days (Sunday, 2:00 AM)
                    </div>
                    <p className="text-sm mb-3">
                      Performs disk cleanup, registry optimization, and temporary file removal
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-400">
                        <CheckCircle className="mr-1 h-3 w-3 text-[#10B981]" />
                        Last run completed successfully
                      </div>
                      <Button variant="outline" size="sm">Reschedule</Button>
                    </div>
                  </div>
                  
                  <div className="bg-[#121212] p-4 rounded-lg border-l-4 border-[#F59E0B]">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">Monthly Driver Update Check</h4>
                      <Badge variant="outline">Recurring</Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-400 mb-2">
                      <Clock className="mr-1 h-4 w-4" />
                      Next run in 12 days (1st of month, 3:00 AM)
                    </div>
                    <p className="text-sm mb-3">
                      Checks for driver updates and installs them automatically
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-400">
                        <AlertTriangle className="mr-1 h-3 w-3 text-[#F59E0B]" />
                        Last run completed with warnings
                      </div>
                      <Button variant="outline" size="sm">Reschedule</Button>
                    </div>
                  </div>
                  
                  <div className="bg-[#121212] p-4 rounded-lg border-l-4 border-[#10B981]">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">Daily Backup Verification</h4>
                      <Badge variant="outline">Recurring</Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-400 mb-2">
                      <Clock className="mr-1 h-4 w-4" />
                      Next run today (12:00 AM)
                    </div>
                    <p className="text-sm mb-3">
                      Verifies that system backups are completing successfully
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-400">
                        <CheckCircle className="mr-1 h-3 w-\
