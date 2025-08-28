"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, Square, Edit, Share2, Download, Mic, Brain, Users } from "lucide-react"

interface TranscriptEntry {
  id: string
  speaker: string
  text: string
  timestamp: string
  confidence: number
  avatar: string
  isProcessing?: boolean
}

interface AIInsight {
  type: "action_item" | "decision" | "key_point"
  text: string
  participants: string[]
}

export function MeetingTranscription() {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([
    {
      id: "1",
      speaker: "John Smith",
      text: "We need to prioritize the user authentication feature for the next sprint. The AI integration should come after we have a solid foundation.",
      timestamp: "14:32",
      confidence: 0.95,
      avatar: "JS",
    },
    {
      id: "2",
      speaker: "Maria Johnson",
      text: "I agree. Let's also consider the database schema changes needed for the new features.",
      timestamp: "14:33",
      confidence: 0.92,
      avatar: "MJ",
    },
  ])
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([
    {
      type: "action_item",
      text: "Prioritize user authentication feature for next sprint",
      participants: ["John Smith"],
    },
    {
      type: "decision",
      text: "AI integration will be implemented after authentication foundation",
      participants: ["John Smith", "Maria Johnson"],
    },
  ])
  const [recordingDuration, setRecordingDuration] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRecording])

  const handleStartRecording = async () => {
    setIsRecording(true)
    setIsProcessing(true)
    // Simulate AI processing
    setTimeout(() => setIsProcessing(false), 2000)
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    setRecordingDuration(0)
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getInsightIcon = (type: AIInsight["type"]) => {
    switch (type) {
      case "action_item":
        return "📋"
      case "decision":
        return "✅"
      case "key_point":
        return "💡"
    }
  }

  const getInsightColor = (type: AIInsight["type"]) => {
    switch (type) {
      case "action_item":
        return "bg-chart-5 text-white"
      case "decision":
        return "bg-primary text-primary-foreground"
      case "key_point":
        return "bg-chart-2 text-chart-3"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-balance flex items-center">
              <Brain className="w-5 h-5 mr-2" />
              AI Meeting Transcription
            </CardTitle>
            <CardDescription>Real-time transcription with AI insights</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            {isRecording && (
              <Badge variant="secondary" className="bg-destructive text-destructive-foreground animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                Recording {formatDuration(recordingDuration)}
              </Badge>
            )}
            {isProcessing && (
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                <Brain className="w-3 h-3 mr-1" />
                AI Processing...
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Recording Controls */}
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-4">
            <Button
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              variant={isRecording ? "destructive" : "default"}
              size="sm"
            >
              {isRecording ? (
                <>
                  <Square className="w-4 h-4 mr-2" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 mr-2" />
                  Start Recording
                </>
              )}
            </Button>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>5 participants detected</span>
            </div>
          </div>

          {isProcessing && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Processing audio...</span>
              <Progress value={75} className="w-20" />
            </div>
          )}
        </div>

        {/* AI Insights Panel */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm flex items-center">
            <Brain className="w-4 h-4 mr-2" />
            AI Insights
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {aiInsights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                <span className="text-lg">{getInsightIcon(insight.type)}</span>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge className={getInsightColor(insight.type)} variant="secondary">
                      {insight.type.replace("_", " ")}
                    </Badge>
                  </div>
                  <p className="text-sm text-pretty">{insight.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">Participants: {insight.participants.join(", ")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Transcript */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Live Transcript</h4>
          <div className="bg-muted p-4 rounded-lg max-h-80 overflow-y-auto space-y-4">
            {transcript.map((entry) => (
              <div key={entry.id} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-medium">
                  {entry.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-sm font-medium">{entry.speaker}</p>
                    <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
                    <Badge variant="outline" className="text-xs">
                      {Math.round(entry.confidence * 100)}% confidence
                    </Badge>
                    {entry.isProcessing && (
                      <Badge variant="secondary" className="text-xs bg-primary text-primary-foreground">
                        Processing...
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground text-pretty">{entry.text}</p>
                </div>
              </div>
            ))}

            {isRecording && (
              <div className="flex items-center space-x-3 opacity-50">
                <div className="w-8 h-8 bg-muted-foreground rounded-full flex items-center justify-center">
                  <Mic className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">Listening...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button size="sm">
            <Play className="w-4 h-4 mr-2" />
            Play Recording
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Transcript
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
