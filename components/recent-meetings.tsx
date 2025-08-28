import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mic, Calendar, Users, Play } from "lucide-react"

const meetings = [
  {
    id: 1,
    title: "Product Planning Session",
    date: "Today, 2:30 PM",
    duration: "45 min",
    participants: 5,
    status: "Completed",
    hasRecording: true,
  },
  {
    id: 2,
    title: "Weekly Team Standup",
    date: "Yesterday, 9:00 AM",
    duration: "30 min",
    participants: 8,
    status: "Completed",
    hasRecording: true,
  },
  {
    id: 3,
    title: "Client Presentation",
    date: "Jan 10, 3:00 PM",
    duration: "60 min",
    participants: 12,
    status: "Completed",
    hasRecording: false,
  },
]

export function RecentMeetings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-balance">
          <Mic className="w-5 h-5 mr-2" />
          Recent Meetings
        </CardTitle>
        <CardDescription>Your latest meeting sessions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="p-3 border rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm text-pretty">{meeting.title}</h4>
              <Badge variant="outline" className="text-xs">
                {meeting.status}
              </Badge>
            </div>

            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {meeting.date}
              </div>
              <div className="flex items-center">
                <Users className="w-3 h-3 mr-1" />
                {meeting.participants}
              </div>
              <span>{meeting.duration}</span>
            </div>

            {meeting.hasRecording && (
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <Play className="w-3 h-3 mr-2" />
                View Transcription
              </Button>
            )}
          </div>
        ))}

        <Button variant="outline" className="w-full mt-4 bg-transparent">
          <Calendar className="w-4 h-4 mr-2" />
          View All Meetings
        </Button>
      </CardContent>
    </Card>
  )
}
