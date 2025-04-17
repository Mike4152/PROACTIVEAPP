"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BrainCircuit, Send } from 'lucide-react'

// Mock chat history
const initialChatHistory = [
  {
    role: "assistant",
    content: "Hello! I'm your ProActiveTrack AI Assistant. How can I help you today?",
    timestamp: "10:30 AM",
  },
]

export function AIAssistantImproved() {
  const [chatInput, setChatInput] = useState("")
  const [chatHistory, setChatHistory] = useState(initialChatHistory)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

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

    // Simulate AI response after a delay
    setTimeout(() => {
      setIsAnalyzing(false)
      setChatHistory((current) => [
        ...current,
        {
          role: "assistant",
          content: getAIResponse(chatInput),
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
    }, 1500)
  }

  // Function to generate responses based on input keywords
  const getAIResponse = (input: string) => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("each device") || lowerInput.includes("separately")) {
      return (
        "I'll analyze each device separately for you:\n\n" +
        "**WS-DEV-001 (John Smith)**:\n" +
        "Health Score: 92% - Excellent condition\n" +
        "CPU: Operating at normal levels with occasional spikes during compilation tasks\n" +
        "Memory: 14.2GB/32GB in use - No issues detected\n" +
        "Storage: 384GB/1TB used - Healthy read/write speeds\n" +
        "Last Issue: None in the past 30 days\n\n" +
        "**WS-MKT-002 (Sarah Johnson)**:\n" +
        "Health Score: 78% - Warning state\n" +
        "CPU: Normal operation\n" +
        "Memory: 12.8GB/16GB in use - Approaching capacity during design software usage\n" +
        "Storage: 402GB/512GB used - Warning: Approaching capacity\n" +
        "Last Issue: Memory pressure detected during Adobe suite usage\n\n" +
        "**WS-HR-004 (Emily Davis)**:\n" +
        "Health Score: 45% - Critical state\n" +
        "CPU: Abnormal usage patterns detected - 95% sustained usage\n" +
        "Memory: 7.2GB/8GB in use - Consistently at capacity\n" +
        "Storage: 238GB/256GB used - Critical: Less than 20GB remaining\n" +
        "Last Issue: Disk failure prediction based on SMART data - Immediate backup recommended\n\n" +
        "Would you like me to provide more detailed analysis on any specific device?"
      )
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
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
            {chatHistory.map((message, index) => (
              <div key={index} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "assistant" ? "bg-[#0F172A] text-white" : "bg-[#38BDF8] text-white"
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  <div className="text-xs text-right mt-1 opacity-70">{message.timestamp}</div>
                </div>
              </div>
            ))}

            {isAnalyzing && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-[#0F172A] text-white">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 bg-[#38BDF8] rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-[#38BDF8] rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-[#38BDF8] rounded-full animate-bounce"
                        style={{ animationDelay: "600ms" }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-400">AI Assistant is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Input
              placeholder="Ask the AI Assistant..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 bg-white text-black placeholder:text-gray-500 border-[#334155] focus:border-[#38BDF8]"
              style={{ color: 'black' }}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isAnalyzing || !chatInput.trim()}
              className="bg-[#38BDF8] hover:bg-[#0EA5E9]"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}