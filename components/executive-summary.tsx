"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"

const mockData = [
  { name: "Mon", prevented: 12, resolved: 5 },
  { name: "Tue", prevented: 19, resolved: 7 },
  { name: "Wed", prevented: 15, resolved: 9 },
  { name: "Thu", prevented: 22, resolved: 12 },
  { name: "Fri", prevented: 18, resolved: 8 },
  { name: "Sat", prevented: 9, resolved: 3 },
  { name: "Sun", prevented: 7, resolved: 2 },
]

const impactStats = [
  { label: "Productivity Saved", value: "42 hours", description: "Prevented 50% productivity loss" },
  { label: "Issues Prevented", value: "102", description: "Before they impacted users" },
  { label: "Avg. Resolution Time", value: "4.2 min", description: "Down from 27 minutes" },
]

export function ExecutiveSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Executive Summary</CardTitle>
        <CardDescription>Downtime prevention metrics and productivity impact</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {impactStats.map((stat, index) => (
            <div key={index} className="text-center p-3 bg-[#0D1117] rounded-lg border border-[#1E2430]">
              <div className="text-2xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#00F0FF] text-transparent bg-clip-text">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-white mt-1">{stat.label}</div>
              <div className="text-xs text-[#AAB1B7] mt-1">{stat.description}</div>
            </div>
          ))}
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2430" vertical={false} />
              <XAxis dataKey="name" stroke="#AAB1B7" />
              <YAxis stroke="#AAB1B7" />
              <Tooltip
                contentStyle={{ backgroundColor: "#161B22", borderColor: "#1E2430" }}
                labelStyle={{ color: "#FFFFFF" }}
              />
              <Bar dataKey="prevented" name="Issues Prevented" fill="url(#blueGradient)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="resolved" name="Issues Resolved" fill="url(#tealGradient)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00F0FF" stopOpacity={1} />
                  <stop offset="100%" stopColor="#00F0FF" stopOpacity={0.6} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
