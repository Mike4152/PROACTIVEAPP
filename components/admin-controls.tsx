"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Shield, UserPlus, Key, Lock, FileText, Search, Trash2, Edit, Eye } from "lucide-react"

// Mock data for users
const users = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@company.com",
    role: "Administrator",
    department: "IT",
    status: "active",
    lastLogin: "Today, 9:32 AM",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "Manager",
    department: "Marketing",
    status: "active",
    lastLogin: "Yesterday, 4:15 PM",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@company.com",
    role: "Manager",
    department: "Finance",
    status: "active",
    lastLogin: "Today, 11:05 AM",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@company.com",
    role: "User",
    department: "HR",
    status: "inactive",
    lastLogin: "2 weeks ago",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.wilson@company.com",
    role: "User",
    department: "Development",
    status: "active",
    lastLogin: "Today, 10:22 AM",
  },
]

// Mock data for security policies
const securityPolicies = [
  {
    id: 1,
    name: "Password Policy",
    description: "Minimum requirements for user passwords",
    status: "enabled",
    lastUpdated: "2023-10-15",
  },
  {
    id: 2,
    name: "Account Lockout Policy",
    description: "Settings for account lockout after failed login attempts",
    status: "enabled",
    lastUpdated: "2023-10-15",
  },
  {
    id: 3,
    name: "Multi-Factor Authentication",
    description: "Require MFA for all administrative accounts",
    status: "enabled",
    lastUpdated: "2023-11-01",
  },
  {
    id: 4,
    name: "Remote Access Policy",
    description: "Control remote access to company systems",
    status: "enabled",
    lastUpdated: "2023-09-22",
  },
  {
    id: 5,
    name: "Data Retention Policy",
    description: "Rules for retaining and deleting system data",
    status: "disabled",
    lastUpdated: "2023-08-30",
  },
]

// Mock data for audit logs
const auditLogs = [
  {
    id: 1,
    action: "User Login",
    user: "John Smith",
    timestamp: "Today, 9:32 AM",
    details: "Successful login from 192.168.1.105",
    severity: "info",
  },
  {
    id: 2,
    action: "System Setting Changed",
    user: "John Smith",
    timestamp: "Today, 9:45 AM",
    details: "Modified notification settings",
    severity: "info",
  },
  {
    id: 3,
    action: "Failed Login Attempt",
    user: "Unknown",
    timestamp: "Today, 10:15 AM",
    details: "Failed login attempt from 203.0.113.42",
    severity: "warning",
  },
  {
    id: 4,
    action: "User Account Created",
    user: "Sarah Johnson",
    timestamp: "Yesterday, 2:30 PM",
    details: "Created new user account for Robert Miller",
    severity: "info",
  },
  {
    id: 5,
    action: "Permission Changed",
    user: "John Smith",
    timestamp: "Yesterday, 3:12 PM",
    details: "Modified permissions for Marketing group",
    severity: "info",
  },
  {
    id: 6,
    action: "Multiple Failed Login Attempts",
    user: "Emily Davis",
    timestamp: "2 days ago, 11:45 AM",
    details: "5 failed login attempts, account temporarily locked",
    severity: "critical",
  },
]

export function AdminControls() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Security Policies
          </TabsTrigger>
          <TabsTrigger value="audit">
            <FileText className="mr-2 h-4 w-4" />
            Audit Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage user accounts and permissions</CardDescription>
                </div>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </div>
              <div className="relative mt-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  className="pl-8 bg-[#0F172A] border-[#334155]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>
                          <Badge className={user.status === "active" ? "bg-[#10B981]" : "bg-[#94A3B8]"}>
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Key className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4 text-gray-400">
                        No users found matching your search
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardHeader>
              <CardTitle>Security Policies</CardTitle>
              <CardDescription>Configure system security settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {securityPolicies.map((policy) => (
                  <div key={policy.id} className="bg-[#0F172A] p-4 rounded-lg border border-[#334155]">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium flex items-center">
                        <Lock className="mr-2 h-4 w-4 text-[#38BDF8]" />
                        {policy.name}
                      </h4>
                      <Badge className={policy.status === "enabled" ? "bg-[#10B981]" : "bg-[#94A3B8]"}>
                        {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{policy.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-400">Last updated: {policy.lastUpdated}</div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="mr-1 h-3 w-3" />
                          View
                        </Button>
                        <Button size="sm">
                          <Edit className="mr-1 h-3 w-3" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t border-[#334155]">
                  <h3 className="text-lg font-medium mb-4">Global Security Settings</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Enforce Multi-Factor Authentication</Label>
                        <p className="text-sm text-gray-400">Require MFA for all user accounts</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Auto-Lock Inactive Sessions</Label>
                        <p className="text-sm text-gray-400">Automatically lock sessions after inactivity</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="space-y-2">
                      <Label>Session Timeout (minutes)</Label>
                      <Select defaultValue="15">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 minutes</SelectItem>
                          <SelectItem value="10">10 minutes</SelectItem>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">IP Restriction</Label>
                        <p className="text-sm text-gray-400">Limit access to specific IP ranges</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Save Security Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Audit Logs</CardTitle>
                  <CardDescription>System activity and security events</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter by severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severities</SelectItem>
                      <SelectItem value="info">Information</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">Export Logs</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className={`p-4 rounded-md border ${
                      log.severity === "critical"
                        ? "border-l-4 border-l-[#EF4444] bg-[#EF4444]/5 border-[#EF4444]/20"
                        : log.severity === "warning"
                          ? "border-l-4 border-l-[#F59E0B] bg-[#F59E0B]/5 border-[#F59E0B]/20"
                          : "border-[#334155] bg-[#0F172A]"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{log.action}</h4>
                        <p className="text-sm text-gray-400 mt-1">
                          {log.user} • {log.timestamp}
                        </p>
                        <p className="text-sm mt-2">{log.details}</p>
                      </div>
                      <div>
                        {log.severity === "critical" && <Badge className="bg-[#EF4444]">Critical</Badge>}
                        {log.severity === "warning" && <Badge className="bg-[#F59E0B]">Warning</Badge>}
                        {log.severity === "info" && <Badge className="bg-[#38BDF8]">Info</Badge>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-gray-400">
                Showing {auditLogs.length} of {auditLogs.length} logs
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button variant="outline" disabled>
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
