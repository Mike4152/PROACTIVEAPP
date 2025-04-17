"use client"

import { useState } from "react"
import { AlertTriangle, Clock, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const mockAlerts = [
  {
    id: 1,
    title: "Critical CPU usage detected",
    device: "WS-HR-004",
    user: "Emily Davis",
    timestamp: "10 minutes ago",
    severity: "critical",
    description: "CPU usage has been above 90% for more than 15 minutes",
  },
  {
    id: 2,
    title: "Memory usage above threshold",
    device: "WS-MKT-002",
    user: "Sarah Johnson",
    timestamp: "25 minutes ago",
    severity: "warning",
    description: "Memory usage has reached 85% of available capacity",
  },
  {
    id: 3,
    title: "Disk space running low",
    device: "WS-MKT-006",
    user: "Jessica Taylor",
    timestamp: "1 hour ago",
    severity: "warning",
    description: "C: drive has less than 15% free space remaining",
  },
]

export function AlertsPanel() {
  const [alerts, setAlerts] = useState(mockAlerts)

  const acknowledgeAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="mr-2 h-5 w-5 text-[#F59E0B]" />
          Active Alerts
        </CardTitle>
        <CardDescription>Issues requiring immediate attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  "p-4 rounded-md border backdrop-blur-sm transition-all hover:shadow-lg",
                  alert.severity === "critical"
                    ? "border-[#EF4444]/30 bg-gradient-to-r from-[#EF4444]/5 to-transparent"
                    : "border-[#F59E0B]/30 bg-gradient-to-r from-[#F59E0B]/5 to-transparent",
                )}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-white">{alert.title}</h4>
                    <p className="text-sm text-[#AAB1B7] mt-1">
                      {alert.device} • {alert.user}
                    </p>
                    <p className="text-sm mt-2 text-white/80">{alert.description}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center text-xs text-[#AAB1B7] mb-2">
                      <Clock className="h-3 w-3 mr-1" />
                      {alert.timestamp}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="hover:border-[#00F0FF] hover:text-[#00F0FF]"
                    >
                      Acknowledge
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-[#AAB1B7]">
              <div className="h-16 w-16 rounded-full bg-[#10B981]/10 flex items-center justify-center mb-3">
                <Shield className="h-8 w-8 text-[#10B981]" />
              </div>
              <p className="text-center">No active alerts at this time</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
