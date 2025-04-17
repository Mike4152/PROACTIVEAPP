import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { AdminControls } from "@/components/admin-controls"

export default function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0F172A] text-white">
      <Sidebar />
      <div className="flex-1 pt-16 overflow-auto">
        <DashboardHeader />
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-6">Administrative Controls</h1>
          <AdminControls />
        </main>
      </div>
    </div>
  )
}
