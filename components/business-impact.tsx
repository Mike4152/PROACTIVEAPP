"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, Clock, TrendingUp, Users, Download } from "lucide-react"

// Mock data for productivity impact
const productivityData = [
  { month: "Jan", prevented: 42, resolved: 18, baseline: 60 },
  { month: "Feb", prevented: 38, resolved: 22, baseline: 60 },
  { month: "Mar", prevented: 45, resolved: 15, baseline: 60 },
  { month: "Apr", prevented: 40, resolved: 20, baseline: 60 },
  { month: "May", prevented: 35, resolved: 25, baseline: 60 },
  { month: "Jun", prevented: 48, resolved: 12, baseline: 60 },
  { month: "Jul", prevented: 52, resolved: 8, baseline: 60 },
  { month: "Aug", prevented: 55, resolved: 5, baseline: 60 },
  { month: "Sep", prevented: 48, resolved: 12, baseline: 60 },
  { month: "Oct", prevented: 42, resolved: 18, baseline: 60 },
  { month: "Nov", prevented: 38, resolved: 22, baseline: 60 },
  { month: "Dec", prevented: 45, resolved: 15, baseline: 60 },
]

// Mock data for cost savings
const costSavingsData = [
  { month: "Jan", savings: 12500 },
  { month: "Feb", savings: 11800 },
  { month: "Mar", savings: 13200 },
  { month: "Apr", savings: 12900 },
  { month: "May", savings: 11500 },
  { month: "Jun", savings: 14200 },
  { month: "Jul", savings: 15800 },
  { month: "Aug", savings: 16500 },
  { month: "Sep", savings: 14800 },
  { month: "Oct", savings: 13500 },
  { month: "Nov", savings: 12800 },
  { month: "Dec", savings: 13900 },
]

// Mock data for department impact
const departmentImpactData = [
  { name: "Development", value: 35, color: "#38BDF8" },
  { name: "Marketing", value: 25, color: "#10B981" },
  { name: "Finance", value: 15, color: "#F59E0B" },
  { name: "HR", value: 10, color: "#EF4444" },
  { name: "Operations", value: 15, color: "#8B5CF6" },
]

// Mock data for key metrics
const keyMetrics = [
  {
    title: "Productivity Hours Saved",
    value: "1,842",
    change: "+12%",
    trend: "up",
    description: "Hours saved through proactive monitoring",
  },
  {
    title: "Cost Savings",
    value: "$163,500",
    change: "+8%",
    trend: "up",
    description: "Annual savings from reduced downtime",
  },
  {
    title: "Average Resolution Time",
    value: "4.2 min",
    change: "-65%",
    trend: "down",
    description: "Down from 12 minutes last year",
  },
  {
    title: "User Productivity Impact",
    value: "94%",
    change: "+5%",
    trend: "up",
    description: "Users reporting improved productivity",
  },
]

export function BusinessImpact() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric, index) => (
          <Card key={index} className="bg-[#1E293B] border-[#334155]">
            <CardHeader className="pb-2">
              <CardDescription>{metric.title}</CardDescription>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">{metric.value}</CardTitle>
                <Badge
                  className={
                    metric.trend === "up"
                      ? "bg-[#10B981]"
                      : metric.trend === "down" && metric.change.startsWith("-")
                        ? "bg-[#10B981]"
                        : "bg-[#EF4444]"
                  }
                >
                  {metric.change}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="productivity" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="productivity">
            <Clock className="mr-2 h-4 w-4" />
            Productivity Impact
          </TabsTrigger>
          <TabsTrigger value="financial">
            <DollarSign className="mr-2 h-4 w-4" />
            Financial Impact
          </TabsTrigger>
          <TabsTrigger value="departments">
            <Users className="mr-2 h-4 w-4" />
            Department Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="productivity">
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Productivity Impact Analysis</CardTitle>
                  <CardDescription>Hours saved through proactive monitoring and quick resolution</CardDescription>
                </div>
                <Select defaultValue="year">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="year">Last 12 Months</SelectItem>
                    <SelectItem value="quarter">Last Quarter</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productivityData} stackOffset="sign">
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="month" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" />
                    <Tooltip contentStyle={{ backgroundColor: "#1E293B", borderColor: "#334155" }} />
                    <Legend />
                    <Bar
                      dataKey="prevented"
                      name="Issues Prevented"
                      stackId="stack"
                      fill="#38BDF8"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="resolved"
                      name="Issues Resolved"
                      stackId="stack"
                      fill="#10B981"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-[#0F172A] p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-[#38BDF8]">78%</div>
                  <div className="text-sm font-medium mt-1">Issues Prevented</div>
                  <div className="text-xs text-gray-400 mt-1">Before impacting users</div>
                </div>

                <div className="bg-[#0F172A] p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-[#10B981]">4.2 min</div>
                  <div className="text-sm font-medium mt-1">Avg. Resolution Time</div>
                  <div className="text-xs text-gray-400 mt-1">Down from 12 minutes</div>
                </div>

                <div className="bg-[#0F172A] p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-[#F59E0B]">1,842</div>
                  <div className="text-sm font-medium mt-1">Hours Saved</div>
                  <div className="text-xs text-gray-400 mt-1">Annually across organization</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial">
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Financial Impact Analysis</CardTitle>
                  <CardDescription>Cost savings from reduced downtime and improved efficiency</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Select defaultValue="year">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="year">Last 12 Months</SelectItem>
                      <SelectItem value="quarter">Last Quarter</SelectItem>
                      <SelectItem value="month">Last Month</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={costSavingsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="month" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" />
                    <Tooltip
                      formatter={(value) => [`$${value.toLocaleString()}`, "Cost Savings"]}
                      contentStyle={{ backgroundColor: "#1E293B", borderColor: "#334155" }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="savings"
                      name="Cost Savings"
                      stroke="#38BDF8"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-[#0F172A] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Annual Savings</h4>
                    <TrendingUp className="h-5 w-5 text-[#10B981]" />
                  </div>
                  <div className="text-2xl font-bold text-[#38BDF8]">$163,500</div>
                  <div className="text-xs text-[#10B981] mt-1">+8% from previous year</div>
                </div>

                <div className="bg-[#0F172A] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">ROI</h4>
                    <TrendingUp className="h-5 w-5 text-[#10B981]" />
                  </div>
                  <div className="text-2xl font-bold text-[#38BDF8]">342%</div>
                  <div className="text-xs text-[#10B981] mt-1">+15% from previous year</div>
                </div>

                <div className="bg-[#0F172A] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Cost Per Device</h4>
                    <TrendingUp className="h-5 w-5 text-[#10B981]" />
                  </div>
                  <div className="text-2xl font-bold text-[#38BDF8]">$12.40</div>
                  <div className="text-xs text-[#10B981] mt-1">-22% from previous year</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[#0F172A] rounded-lg">
                <h3 className="text-lg font-medium mb-2">Financial Impact Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-[#38BDF8] mr-2"></div>
                      <span>Reduced Downtime</span>
                    </div>
                    <div className="font-medium">$98,500</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-[#10B981] mr-2"></div>
                      <span>Improved Productivity</span>
                    </div>
                    <div className="font-medium">$42,000</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-[#F59E0B] mr-2"></div>
                      <span>Hardware Lifespan Extension</span>
                    </div>
                    <div className="font-medium">$23,000</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[#1E293B] border-[#334155] md:col-span-2">
              <CardHeader>
                <CardTitle>Department Impact Analysis</CardTitle>
                <CardDescription>Productivity impact across different departments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { department: "Development", hours: 620, issues: 45 },
                        { department: "Marketing", hours: 420, issues: 32 },
                        { department: "Finance", hours: 280, issues: 22 },
                        { department: "HR", hours: 180, issues: 15 },
                        { department: "Operations", hours: 342, issues: 28 },
                      ]}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                      <XAxis type="number" stroke="#94A3B8" />
                      <YAxis dataKey="department" type="category" stroke="#94A3B8" />
                      <Tooltip contentStyle={{ backgroundColor: "#1E293B", borderColor: "#334155" }} />
                      <Legend />
                      <Bar dataKey="hours" name="Hours Saved" fill="#38BDF8" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 p-4 bg-[#0F172A] rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Department Efficiency Improvement</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Development</span>
                        <span>+18%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full">
                        <div className="h-2 bg-[#38BDF8] rounded-full" style={{ width: "18%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Marketing</span>
                        <span>+12%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full">
                        <div className="h-2 bg-[#38BDF8] rounded-full" style={{ width: "12%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Finance</span>
                        <span>+15%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full">
                        <div className="h-2 bg-[#38BDF8] rounded-full" style={{ width: "15%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>HR</span>
                        <span>+9%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full">
                        <div className="h-2 bg-[#38BDF8] rounded-full" style={{ width: "9%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Operations</span>
                        <span>+14%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full">
                        <div className="h-2 bg-[#38BDF8] rounded-full" style={{ width: "14%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1E293B] border-[#334155]">
              <CardHeader>
                <CardTitle>Resource Distribution</CardTitle>
                <CardDescription>IT resources allocated by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={departmentImpactData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {departmentImpactData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: "#1E293B", borderColor: "#334155" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-[#38BDF8] mr-2"></div>
                      <span>Development</span>
                    </div>
                    <Badge>35%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-[#10B981] mr-2"></div>
                      <span>Marketing</span>
                    </div>
                    <Badge>25%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-[#F59E0B] mr-2"></div>
                      <span>Finance</span>
                    </div>
                    <Badge>15%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-[#EF4444] mr-2"></div>
                      <span>HR</span>
                    </div>
                    <Badge>10%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-[#8B5CF6] mr-2"></div>
                      <span>Operations</span>
                    </div>
                    <Badge>15%</Badge>
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
