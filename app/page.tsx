import { Sidebar } from "@/components/sidebar"
import { SystemOverview } from "@/components/system-overview"
import { AlertsPanel } from "@/components/alerts-panel"
import { ExecutiveSummary } from "@/components/executive-summary"

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0D1117] text-white">
      <Sidebar />
      <div className="flex-1 pt-16 overflow-auto">
        <main className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-8 text-white">
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#00F0FF] text-transparent bg-clip-text">
              Dashboard Overview
            </span>
          </h1>
          <SystemOverview />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <AlertsPanel />
            <ExecutiveSummary />
          </div>
        </main>
      </div>
    </div>
  )
}
