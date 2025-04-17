"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Fan, Zap, Thermometer, BarChart3, Volume2, Gauge, Flame, Wind } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const fanProfiles = [
  { id: "whisper", name: "Whisper Mode", description: "Silent operation with minimal fan noise" },
  { id: "standard", name: "Standard Mode", description: "Balanced performance and noise levels" },
  { id: "performance", name: "Performance Mode", description: "Increased cooling for demanding tasks" },
  { id: "full", name: "Full Speed", name: "Maximum cooling capacity" },
]

export function HardwareManagement() {
  const [fanProfile, setFanProfile] = useState("standard")
  const [cpuFanSpeed, setCpuFanSpeed] = useState(60)
  const [caseFanSpeed, setCaseFanSpeed] = useState(50)
  const [powerMode, setPowerMode] = useState("balanced")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="fans" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="fans">Fan Control</TabsTrigger>
          <TabsTrigger value="power">Power Management</TabsTrigger>
          <TabsTrigger value="thermal">Thermal Management</TabsTrigger>
        </TabsList>

        <TabsContent value="fans">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[#1E1E1E] border-gray-800 md:col-span-2">
              <CardHeader>
                <CardTitle>Fan Profile Management</CardTitle>
                <CardDescription>Adjust cooling performance and noise levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {fanProfiles.map((profile) => (
                    <Card
                      key={profile.id}
                      className={cn(
                        "cursor-pointer transition-all border",
                        fanProfile === profile.id
                          ? "border-[#6366F1] bg-[#6366F1]/10"
                          : "border-gray-800 hover:border-gray-700",
                      )}
                      onClick={() => setFanProfile(profile.id)}
                    >
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        {profile.id === "whisper" && <Volume2 className="h-8 w-8 mb-2 text-[#6366F1]" />}
                        {profile.id === "standard" && <Fan className="h-8 w-8 mb-2 text-[#6366F1]" />}
                        {profile.id === "performance" && <Gauge className="h-8 w-8 mb-2 text-[#6366F1]" />}
                        {profile.id === "full" && <Wind className="h-8 w-8 mb-2 text-[#6366F1]" />}
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
                      <span className="text-sm text-gray-400">{cpuFanSpeed}%</span>
                    </div>
                    <Slider
                      value={[cpuFanSpeed]}
                      onValueChange={(value) => setCpuFanSpeed(value[0])}
                      min={20}
                      max={100}
                      step={1}
                      className="[&>span]:bg-[#6366F1]"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Silent</span>
                      <span>Max Cooling</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Case Fan Speed</label>
                      <span className="text-sm text-gray-400">{caseFanSpeed}%</span>
                    </div>
                    <Slider
                      value={[caseFanSpeed]}
                      onValueChange={(value) => setCaseFanSpeed(value[0])}
                      min={20}
                      max={100}
                      step={1}
                      className="[&>span]:bg-[#6366F1]"
                    />
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

            <Card className="bg-[#1E1E1E] border-gray-800">
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

        <TabsContent value="power">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#1E1E1E] border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-[#F59E0B]" />
                  Power Management
                </CardTitle>
                <CardDescription>Optimize power consumption and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium block mb-2">Power Plan</label>
                    <Select value={powerMode} onValueChange={setPowerMode}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select power mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="power-saver">Power Saver</SelectItem>
                        <SelectItem value="balanced">Balanced</SelectItem>
                        <SelectItem value="performance">High Performance</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium block">CPU Power Limit</label>
                    <Slider defaultValue={[80]} min={50} max={100} step={5} className="[&>span]:bg-[#6366F1]" />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Power Saving</span>
                      <span>Max Performance</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium block">Display Power Saving</label>
                    <Slider defaultValue={[70]} min={0} max={100} step={10} className="[&>span]:bg-[#6366F1]" />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Maximum Brightness</span>
                      <span>Power Saving</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-800">
                    <h4 className="font-medium mb-2">Sleep Settings</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-400 block mb-1">Sleep after</label>
                        <Select defaultValue="30">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="never">Never</SelectItem>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 block mb-1">Display off after</label>
                        <Select defaultValue="15">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="never">Never</SelectItem>
                            <SelectItem value="5">5 minutes</SelectItem>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button>Apply Settings</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1E1E1E] border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-[#6366F1]" />
                  Power Consumption
                </CardTitle>
                <CardDescription>Current and historical power usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#121212] p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Current Power</div>
                      <div className="text-2xl font-bold">65W</div>
                      <div className="text-xs text-[#10B981]">-12% vs. avg</div>
                    </div>
                    <div className="bg-[#121212] p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Peak Today</div>
                      <div className="text-2xl font-bold">120W</div>
                      <div className="text-xs text-gray-400">2 hours ago</div>
                    </div>
                  </div>

                  <div className="h-64 bg-[#121212] rounded-lg p-4">
                    <div className="text-sm font-medium mb-2">Power Usage (24h)</div>
                    {/* Placeholder for power usage chart */}
                    <div className="h-48 flex items-center justify-center text-gray-500">
                      Power usage chart would be displayed here
                    </div>
                  </div>

                  <div className="bg-[#121212] p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Power Saving Recommendations</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center mr-2 mt-0.5">
                          <Zap className="h-3 w-3" />
                        </div>
                        <span>Reduce screen brightness to save up to 15W</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center mr-2 mt-0.5">
                          <Zap className="h-3 w-3" />
                        </div>
                        <span>Close unused applications consuming 45W in background</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center mr-2 mt-0.5">
                          <Zap className="h-3 w-3" />
                        </div>
                        <span>Enable sleep mode after 15 minutes of inactivity</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="thermal">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[#1E1E1E] border-gray-800 md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Thermometer className="mr-2 h-5 w-5 text-[#EF4444]" />
                  Thermal Management
                </CardTitle>
                <CardDescription>Monitor and control system temperatures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">CPU Temperature</h4>
                      <div className="relative h-4 bg-gradient-to-r from-[#10B981] via-[#F59E0B] to-[#EF4444] rounded-full">
                        <div className="absolute -top-1 h-6 w-1 bg-white" style={{ left: "65%" }}></div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>30°C</span>
                        <span>50°C</span>
                        <span>70°C</span>
                        <span>90°C</span>
                      </div>
                      <div className="text-center">
                        <span className="text-xl font-bold">65°C</span>
                        <span className="text-sm text-gray-400 ml-2">Current</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">GPU Temperature</h4>
                      <div className="relative h-4 bg-gradient-to-r from-[#10B981] via-[#F59E0B] to-[#EF4444] rounded-full">
                        <div className="absolute -top-1 h-6 w-1 bg-white" style={{ left: "72%" }}></div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>30°C</span>
                        <span>50°C</span>
                        <span>70°C</span>
                        <span>90°C</span>
                      </div>
                      <div className="text-center">
                        <span className="text-xl font-bold text-[#F59E0B]">72°C</span>
                        <span className="text-sm text-gray-400 ml-2">Current</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-800">
                    <h4 className="font-medium mb-4">Thermal Throttling Prevention</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">CPU Thermal Limit</div>
                          <div className="text-sm text-gray-400">Maximum temperature before throttling</div>
                        </div>
                        <Select defaultValue="85">
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="75">75°C</SelectItem>
                            <SelectItem value="80">80°C</SelectItem>
                            <SelectItem value="85">85°C</SelectItem>
                            <SelectItem value="90">90°C</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">GPU Thermal Limit</div>
                          <div className="text-sm text-gray-400">Maximum temperature before throttling</div>
                        </div>
                        <Select defaultValue="80">
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="75">75°C</SelectItem>
                            <SelectItem value="80">80°C</SelectItem>
                            <SelectItem value="85">85°C</SelectItem>
                            <SelectItem value="90">90°C</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Thermal Policy</div>
                          <div className="text-sm text-gray-400">How to respond to high temperatures</div>
                        </div>
                        <Select defaultValue="balanced">
                          <SelectTrigger className="w-36">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="quiet">Quiet First</SelectItem>
                            <SelectItem value="balanced">Balanced</SelectItem>
                            <SelectItem value="performance">Performance First</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button>Apply Settings</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1E1E1E] border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Flame className="mr-2 h-5 w-5 text-[#F59E0B]" />
                  Thermal History
                </CardTitle>
                <CardDescription>Temperature trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="h-64 bg-[#121212] rounded-lg p-4">
                    <div className="text-sm font-medium mb-2">CPU Temperature (24h)</div>
                    {/* Placeholder for temperature chart */}
                    <div className="h-48 flex items-center justify-center text-gray-500">
                      Temperature chart would be displayed here
                    </div>
                  </div>

                  <div className="bg-[#121212] p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Thermal Alerts</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>CPU exceeded 80°C</span>
                        <span className="text-gray-400">2 hours ago</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>GPU exceeded 85°C</span>
                        <span className="text-gray-400">Yesterday</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#121212] p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Cooling Recommendations</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-[#6366F1]/20 text-[#6366F1] flex items-center justify-center mr-2 mt-0.5">
                          <Fan className="h-3 w-3" />
                        </div>
                        <span>Clean CPU heatsink to improve cooling efficiency</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-[#6366F1]/20 text-[#6366F1] flex items-center justify-center mr-2 mt-0.5">
                          <Fan className="h-3 w-3" />
                        </div>
                        <span>Ensure proper case airflow with unobstructed vents</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
