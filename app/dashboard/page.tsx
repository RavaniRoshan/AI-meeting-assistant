import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { MeetingTranscription } from "@/components/meeting-transcription"
import { ProjectTemplates } from "@/components/project-templates"
import { TaskAssignment } from "@/components/task-assignment"
import { RecentMeetings } from "@/components/recent-meetings"
import { AIInsightsPanel } from "@/components/ai-insights-panel"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <MeetingTranscription />
              <AIInsightsPanel />
              <TaskAssignment />
            </div>
            <div className="space-y-6">
              <RecentMeetings />
              <ProjectTemplates />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
