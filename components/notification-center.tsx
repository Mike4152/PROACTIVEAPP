"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, AlertTriangle, CheckCircle, Clock, Trash2, Mail, MessageSquare, Smartphone, Cpu } from "lucide-react"

// Mock data for notifications
const notifications = [
  {
    id: 1,
    title: "Critical CPU usage detected",
    device: "WS-HR-004",
    user: "Emily Davis",
    timestamp: "10 minutes ago",
    severity: "critical",
    category: "hardware",
    read: false,
  },
  {
    id: 2,
    title: "Memory usage above threshold",
    device: "WS-MKT-002",
    user: "Sarah Johnson",
    timestamp: "25 minutes ago",
    severity: "warning",
    category: "hardware",
    read: false,
  },
  {
    id: 3,
    title: "Disk space running low",
    device: "WS-MKT-006",
    user: "Jessica Taylor",
    timestamp: "1 hour ago",
    severity: "warning",
    category: "storage",
    read: true,
  },
  {
    id: 4,
    title: "Windows update KB5032288 available",
    device: "Multiple devices",
    user: "System",
    timestamp: "2 hours ago",
    severity: "info",
    category: "updates",
    read: true,
  },
  {
    id: 5,
    title: "Network connectivity issues",
    device: "WS-DEV-003",
    user: "Michael Brown",
    timestamp: "3 hours ago",
    severity: "warning",
    category: "network",
    read: true,
  },
  {
    id: 6,
    title: "Antivirus definitions updated",
    device: "All devices",
    user: "System",
    timestamp: "5 hours ago",
    severity: "info",
    category: "security",
    read: true,
  },
]

// Notification settings
const notificationSettings = [
  { id: 1, name: "Critical Alerts", email: true, push: true, sms: true },
  { id: 2, name: "Warning Alerts", email: true, push: true, sms: false },
  { id: 3, name: "Information Updates", email: false, push: true, sms: false },
  { id: 4, name: "System Updates", email: true, push: false, sms: false },
  { id: 5, name: "Maintenance Notifications", email: true, push: true, sms: false },
]

export function NotificationCenter() {
  const [activeNotifications, setActiveNotifications] = useState(notifications)
  const [filter, setFilter] = useState("all")

  const filteredNotifications = activeNotifications.filter((notification) => {
    if (filter === "all") return true
    if (filter === "unread") return !notification.read
    return notification.category === filter
  })

  const markAsRead = (id: number) => {
    setActiveNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setActiveNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: number) => {
    setActiveNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const clearAllNotifications = () => {
    setActiveNotifications([])
  }

  const unreadCount = activeNotifications.filter((n) => !n.read).length

  return (
    <div className="space-y-6">
      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="notifications">
            Notifications
            {unreadCount > 0 && <Badge className="ml-2 bg-[#38BDF8]">{unreadCount}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="settings">Notification Settings</TabsTrigger>
          <TabsTrigger value="channels">Notification Channels</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>System alerts and notifications</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter notifications" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Notifications</SelectItem>
                      <SelectItem value="unread">Unread</SelectItem>
                      <SelectItem value="hardware">Hardware</SelectItem>
                      <SelectItem value="storage">Storage</SelectItem>
                      <SelectItem value="network">Network</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="updates">Updates</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
                    Mark All Read
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={clearAllNotifications}
                    disabled={activeNotifications.length === 0}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-md border ${
                        !notification.read ? "bg-[#38BDF8]/5 border-[#38BDF8]/20" : "border-[#334155] bg-[#0F172A]"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className="mr-3">
                            {notification.severity === "critical" && (
                              <div className="h-8 w-8 rounded-full bg-[#EF4444]/20 text-[#EF4444] flex items-center justify-center">
                                <AlertTriangle className="h-5 w-5" />
                              </div>
                            )}
                            {notification.severity === "warning" && (
                              <div className="h-8 w-8 rounded-full bg-[#F59E0B]/20 text-[#F59E0B] flex items-center justify-center">
                                <AlertTriangle className="h-5 w-5" />
                              </div>
                            )}
                            {notification.severity === "info" && (
                              <div className="h-8 w-8 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] flex items-center justify-center">
                                <Bell className="h-5 w-5" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{notification.title}</h4>
                            <p className="text-sm text-gray-400 mt-1">
                              {notification.device} • {notification.user}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center text-xs text-gray-400 mb-2">
                            <Clock className="h-3 w-3 mr-1" />
                            {notification.timestamp}
                          </div>
                          <div className="flex space-x-2">
                            {!notification.read && (
                              <Button size="sm" variant="outline" onClick={() => markAsRead(notification.id)}>
                                Mark Read
                              </Button>
                            )}
                            <Button size="sm" variant="destructive" onClick={() => deleteNotification(notification.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                    <CheckCircle className="h-12 w-12 mb-2 text-[#10B981]" />
                    <p className="text-center">No notifications to display</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-4 gap-4 font-medium text-sm">
                  <div>Notification Type</div>
                  <div className="text-center">Email</div>
                  <div className="text-center">Push</div>
                  <div className="text-center">SMS</div>
                </div>

                {notificationSettings.map((setting) => (
                  <div key={setting.id} className="grid grid-cols-4 gap-4 items-center py-2 border-b border-[#334155]">
                    <div>{setting.name}</div>
                    <div className="flex justify-center">
                      <Switch checked={setting.email} />
                    </div>
                    <div className="flex justify-center">
                      <Switch checked={setting.push} />
                    </div>
                    <div className="flex justify-center">
                      <Switch checked={setting.sms} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Notification Schedule</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Configure when you want to receive non-critical notifications
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Time</Label>
                      <Select defaultValue="08:00">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="00:00">12:00 AM</SelectItem>
                          <SelectItem value="06:00">6:00 AM</SelectItem>
                          <SelectItem value="08:00">8:00 AM</SelectItem>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>End Time</Label>
                      <Select defaultValue="18:00">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="17:00">5:00 PM</SelectItem>
                          <SelectItem value="18:00">6:00 PM</SelectItem>
                          <SelectItem value="20:00">8:00 PM</SelectItem>
                          <SelectItem value="23:59">11:59 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-2">Priority Settings</h3>
                  <p className="text-sm text-gray-400 mb-4">Configure which notifications should bypass quiet hours</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-[#EF4444]" />
                        Critical Alerts
                      </Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-[#F59E0B]" />
                        Warning Alerts
                      </Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center">
                        <Bell className="h-4 w-4 mr-2 text-[#38BDF8]" />
                        Information Updates
                      </Label>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="channels">
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
              <CardDescription>Configure notification delivery methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-[#0F172A] p-4 rounded-lg border border-[#334155]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] flex items-center justify-center mr-3">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-gray-400">Receive notifications via email</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label>Email Address</Label>
                      <Input defaultValue="admin@company.com" />
                    </div>
                    <div className="space-y-1">
                      <Label>Email Format</Label>
                      <Select defaultValue="html">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="html">HTML</SelectItem>
                          <SelectItem value="text">Plain Text</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0F172A] p-4 rounded-lg border border-[#334155]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] flex items-center justify-center mr-3">
                        <Smartphone className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Push Notifications</h4>
                        <p className="text-sm text-gray-400">Receive notifications on your devices</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-[#334155]">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center mr-2">
                          <Smartphone className="h-4 w-4" />
                        </div>
                        <span>iPhone 13 Pro</span>
                      </div>
                      <Button size="sm" variant="outline">
                        Remove
                      </Button>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-[#334155]">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center mr-2">
                          <Cpu className="h-4 w-4" />
                        </div>
                        <span>Desktop Chrome</span>
                      </div>
                      <Button size="sm" variant="outline">
                        Remove
                      </Button>
                    </div>
                    <Button variant="outline" className="w-full">
                      Add New Device
                    </Button>
                  </div>
                </div>

                <div className="bg-[#0F172A] p-4 rounded-lg border border-[#334155]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] flex items-center justify-center mr-3">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">SMS Notifications</h4>
                        <p className="text-sm text-gray-400">Receive critical alerts via SMS</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label>Phone Number</Label>
                      <Input defaultValue="+1 (555) 123-4567" />
                    </div>
                    <p className="text-xs text-gray-400">
                      SMS notifications are only sent for critical alerts to avoid excessive messaging
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
