import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DeviceDetailView } from "@/components/device-detail-view"

interface DevicePageProps {
  params: {
    id: string
  }
}

export default function DevicePage({ params }: DevicePageProps) {
  return (
    <div className="flex flex-col min-h-screen bg-[#0D1117] text-white">
      <Sidebar />
      <div className="flex-1 pt-16 overflow-auto">
        <DashboardHeader />
        <main className="container mx-auto p-6">
          <DeviceDetailView deviceId={params.id} />
        </main>
      </div>
    </div>
  )
}
