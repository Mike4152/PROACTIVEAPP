import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { AIAssistantImproved } from "@/components/ai-assistant-improved" // Make sure this path is correct

export default function AIAssistantPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0F172A] text-white">
      <Sidebar />
      <div className="flex-1 pt-16 overflow-auto">
        <DashboardHeader />
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-6">AI Assistant</h1>
          <AIAssistantImproved />
        </main>
      </div>
    </div>
  )
}