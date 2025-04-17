"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  BrainCircuit,
  AlertTriangle,
  Clock,
  Send,
  BarChart3,
  Cpu,
  Network,
  Shield,
  Zap,
  MessageSquare,
} from "lucide-react"

// Mock data for predictions
const predictions = [
  {
    id: 1,
    device: "WS-DEV-004",
    user: "Emily Davis",
    issue: "Disk failure imminent",
    probability: 92,
    impact: "critical",
    timeframe: "1-2 days",
    recommendation: "Schedule immediate disk replacement and backup data",
  },
  {
    id: 2,
    device: "WS-MKT-002",
    user: "Sarah Johnson",
    issue: "Memory degradation",
    probability: 78,
    impact: "warning",
    timeframe: "1-2 weeks",
    recommendation: "Schedule memory diagnostic and potential upgrade",
  },
  {
    id: 3,
    device: "SRV-DB-001",
    user: "System",
    issue: "Database performance degradation",
    probability: 85,
    impact: "warning",
    timeframe: "3-5 days",
    recommendation: "Run database optimization and increase monitoring",
  },
]

// Mock data for insights
const insights = [
  {
    id: 1,
    title: "Recurring Network Issues",
    description: "Pattern detected of intermittent network connectivity in Marketing department",
    devices: ["WS-MKT-002", "WS-MKT-006", "WS-MKT-008"],
    recommendation: "Investigate network switch in Marketing department zone",
  },
  {
    id: 2,
    title: "Software Conflict Detected",
    description: "Recent Adobe update conflicts with antivirus software on Development machines",
    devices: ["WS-DEV-001", "WS-DEV-003", "WS-DEV-005"],
    recommendation: "Roll back Adobe update or update antivirus definitions",
  },
  {
    id: 3,
    title: "Unusual Login Patterns",
    description: "Multiple failed login attempts followed by successful logins outside business hours",
    devices: ["WS-FIN-002", "WS-FIN-004"],
    recommendation: "Review security logs and consider enabling MFA for Finance department",
  },
]

// Mock chat history
const initialChatHistory = [
  {
    role: "assistant",
    content: "Hello! I'm your ProActiveTrack AI Assistant. How can I help you today?",
    timestamp: "10:30 AM",
  },
]

export function AIAssistant() {
  const [chatInput, setChatInput] = useState("")
  const [chatHistory, setChatHistory] = useState(initialChatHistory)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analyzeProgress, setAnalyzeProgress] = useState(0)

  const handleSendMessage = () => {
    if (!chatInput.trim()) return

    // Add user message to chat
    setChatHistory([
      ...chatHistory,
      {
        role: "user",
        content: chatInput,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ])

    // Clear input
    setChatInput("")

    // Simulate AI thinking
    setIsAnalyzing(true)
    setAnalyzeProgress(0)

    const interval = setInterval(() => {
      setAnalyzeProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAnalyzing(false)

          // Add AI response after "thinking"
          setChatHistory((current) => [
            ...current,
            {
              role: "assistant",
              content: getAIResponse(chatInput),
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ])

          return 100
        }
        return prev + 5
      })
    }, 100)
  }

  // Simple function to generate responses based on input keywords
  const getAIResponse = (input) => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("each device") || lowerInput.includes("separately")) {
      return `I'll analyze each device separately for you:

**WS-DEV-001 (John Smith)**: 
Health Score: 92% - Excellent condition
CPU: Operating at normal levels with occasional spikes during compilation tasks
Memory: 14.2GB/32GB in use - No issues detected
Storage: 384GB/1TB used - Healthy read/write speeds
Last Issue: None in the past 30 days

**WS-MKT-002 (Sarah Johnson)**:
Health Score: 78% - Warning state
CPU: Normal operation
Memory: 12.8GB/16GB in use - Approaching capacity during design software usage
Storage: 402GB/512GB used - Warning: Approaching capacity
Last Issue: Memory pressure detected during Adobe suite usage

**WS-HR-004 (Emily Davis)**:
Health Score: 45% - Critical state
CPU: Abnormal usage patterns detected - 95% sustained usage
Memory: 7.2GB/8GB in use - Consistently at capacity
Storage: 238GB/256GB used - Critical: Less than 20GB remaining
Last Issue: Disk failure prediction based on SMART data - Immediate backup recommended

Would you like me to provide more detailed analysis on any specific device?`
    } else if (lowerInput.includes("disk") || lowerInput.includes("storage")) {
      return "I've analyzed your storage systems. WS-DEV-004 is showing signs of potential disk failure. I recommend scheduling a backup and replacement within the next 48 hours to prevent data loss."
    } else if (lowerInput.includes("network") || lowerInput.includes("connection")) {
      return "I've detected a pattern of intermittent network issues in the Marketing department. The issue appears to be related to the network switch in that zone. I recommend checking the switch configuration and connections."
    } else if (lowerInput.includes("memory") || lowerInput.includes("ram")) {
      return "Several workstations in the Development department are showing memory utilization consistently above 85%. This may be impacting performance. Consider upgrading RAM on these machines or optimizing the applications running on them."
    } else if (lowerInput.includes("security") || lowerInput.includes("login")) {
      return "I've noticed unusual login patterns on two Finance department workstations. There were multiple failed login attempts followed by successful logins outside normal business hours. I recommend reviewing security logs and considering MFA implementation."
    } else if (lowerInput.includes("predict") || lowerInput.includes("forecast")) {
      return "Based on current trends, I predict you'll see an increase in memory-related issues in the Marketing department within the next 2 weeks. This is likely due to the recent deployment of new design software. Consider proactive memory upgrades for these workstations."
    } else {
      return "I've analyzed your system data and everything appears to be operating within normal parameters. Is there a specific area you'd like me to investigate more deeply?"
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="chat">
            <MessageSquare className="mr-2 h-4 w-4" />
            AI Assistant Chat
          </TabsTrigger>
          <TabsTrigger value="predictions">
            <BrainCircuit className="mr-2 h-4 w-4" />
            Predictive Analysis
          </TabsTrigger>
          <TabsTrigger value="insights">
            <BarChart3 className="mr-2 h-4 w-4" />
            System Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat">
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BrainCircuit className="mr-2 h-5 w-5 text-[#38BDF8]" />
                AI Assistant
              </CardTitle>
              <CardDescription>Ask questions or get predictive insights about your IT systems</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col h-[400px]">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {chatHistory.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "assistant" ? "bg-[#0F172A] text-white" : "bg-[#38BDF8] text-white"
                        }`}
                      >
                        <div className="text-sm">{message.content}</div>
                        <div className="text-xs text-right mt-1 opacity-70">{message.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {isAnalyzing && (
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center">
                      <BrainCircuit className="animate-pulse mr-2 h-4 w-4 text-[#38BDF8]" />
                      <span className="text-sm">AI Assistant is analyzing...</span>
                    </div>
                    <Progress value={analyzeProgress} className="h-1" />
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Ask the AI Assistant..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={isAnalyzing || !chatInput.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions">
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardHeader>
              <CardTitle>Predictive Analysis</CardTitle>
              <CardDescription>AI-powered predictions of potential issues before they occur</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictions.map((prediction) => (
                  <div
                    key={prediction.id}
                    className={`p-4 rounded-md border border-l-4 ${
                      prediction.impact === "critical"
                        ? "border-l-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20"
                        : "border-l-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{prediction.issue}</h4>
                        <p className="text-sm text-gray-400 mt-1">
                          {prediction.device} • {prediction.user}
                        </p>
                      </div>
                      <Badge className={prediction.impact === "critical" ? "bg-[#EF4444]" : "bg-[#F59E0B]"}>
                        {prediction.probability}% Probability
                      </Badge>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-start">
                        <Clock className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                        <span className="text-sm">Expected within {prediction.timeframe}</span>
                      </div>
                      <div className="flex items-start">
                        <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                        <span className="text-sm">{prediction.recommendation}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button size="sm">Take Action</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <Card className="bg-[#1E293B] border-[#334155]">
            <CardHeader>
              <CardTitle>System Insights</CardTitle>
              <CardDescription>AI-detected patterns and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {insights.map((insight) => (
                  <div key={insight.id} className="bg-[#0F172A] p-4 rounded-lg border border-[#334155]">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] flex items-center justify-center mr-3">
                        {insight.title.includes("Network") && <Network className="h-5 w-5" />}
                        {insight.title.includes("Software") && <Cpu className="h-5 w-5" />}
                        {insight.title.includes("Login") && <Shield className="h-5 w-5" />}
                      </div>
                      <div>
                        <h4 className="font-medium">{insight.title}</h4>
                        <p className="text-sm text-gray-400 mt-1">{insight.description}</p>
                      </div>
                    </div>
                    <div className="mt-4 pl-13">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {insight.devices.map((device, index) => (
                          <Badge key={index} variant="outline">
                            {device}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-start">
                        <Zap className="h-4 w-4 mr-2 mt-0.5 text-[#38BDF8]" />
                        <span className="text-sm">{insight.recommendation}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button size="sm">Apply Recommendation</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
