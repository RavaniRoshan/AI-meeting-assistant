"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Lightbulb, CheckCircle, AlertTriangle, Calendar, Users } from "lucide-react"

interface AIInsight {
  type: "action_item" | "decision" | "key_point"
  text: string
  participants: string[]
  priority?: "low" | "medium" | "high"
  dueDate?: string
  category?: string
}

interface AISummary {
  overview: string
  keyDecisions: string[]
  actionItems: string[]
  nextSteps: string[]
}

export function AIInsightsPanel() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [summary, setSummary] = useState<AISummary | null>(null)

  const generateInsights = async () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simulate AI analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    try {
      // Simulate API call to generate insights
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockInsights: AIInsight[] = [
        {
          type: "action_item",
          text: "Schedule follow-up meeting to discuss implementation details",
          participants: ["John Smith", "Maria Johnson"],
          priority: "high",
          dueDate: "2024-01-20",
        },
        {
          type: "decision",
          text: "Team agreed to use microservices architecture for the new feature",
          participants: ["All participants"],
        },
        {
          type: "key_point",
          text: "Budget allocation needs approval from finance team",
          participants: ["Maria Johnson"],
          category: "financial",
        },
      ]

      const mockSummary: AISummary = {
        overview: "Team discussed project priorities and technical architecture decisions.",
        keyDecisions: [
          "Authentication feature prioritized for next sprint",
          "Microservices architecture approved for implementation",
        ],
        actionItems: ["Schedule architecture review meeting", "Get budget approval from finance"],
        nextSteps: ["Begin authentication feature development", "Prepare technical documentation"],
      }

      setInsights(mockInsights)
      setSummary(mockSummary)
    } catch (error) {
      console.error("Failed to generate insights:", error)
    } finally {
      setIsAnalyzing(false)
      clearInterval(progressInterval)
    }
  }

  const getInsightIcon = (type: AIInsight["type"]) => {
    switch (type) {
      case "action_item":
        return CheckCircle
      case "decision":
        return AlertTriangle
      case "key_point":
        return Lightbulb
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

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground"
      case "medium":
        return "bg-chart-5 text-white"
      case "low":
        return "bg-chart-2 text-chart-3"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-balance">
              <Brain className="w-5 h-5 mr-2" />
              AI Meeting Analysis
            </CardTitle>
            <CardDescription>Automated insights and action items</CardDescription>
          </div>
          <Button onClick={generateInsights} disabled={isAnalyzing} size="sm">
            {isAnalyzing ? (
              <>
                <Brain className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Generate Insights
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {isAnalyzing && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Analyzing meeting content...</span>
              <span className="text-muted-foreground">{analysisProgress}%</span>
            </div>
            <Progress value={analysisProgress} className="w-full" />
          </div>
        )}

        {summary && (
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium text-sm mb-2">Meeting Summary</h4>
              <p className="text-sm text-muted-foreground text-pretty">{summary.overview}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="font-medium text-sm">Key Decisions</h5>
                <ul className="space-y-1">
                  {summary.keyDecisions.map((decision, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start">
                      <CheckCircle className="w-3 h-3 mr-2 mt-0.5 text-primary" />
                      <span className="text-pretty">{decision}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h5 className="font-medium text-sm">Next Steps</h5>
                <ul className="space-y-1">
                  {summary.nextSteps.map((step, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start">
                      <Calendar className="w-3 h-3 mr-2 mt-0.5 text-chart-5" />
                      <span className="text-pretty">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {insights.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Generated Insights</h4>
            <div className="space-y-3">
              {insights.map((insight, index) => {
                const IconComponent = getInsightIcon(insight.type)
                return (
                  <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <div
                      className={`w-8 h-8 ${getInsightColor(insight.type)} rounded-lg flex items-center justify-center`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge className={getInsightColor(insight.type)} variant="secondary">
                          {insight.type.replace("_", " ")}
                        </Badge>
                        {insight.priority && (
                          <Badge className={getPriorityColor(insight.priority)} variant="secondary">
                            {insight.priority}
                          </Badge>
                        )}
                        {insight.dueDate && (
                          <Badge variant="outline" className="text-xs">
                            <Calendar className="w-3 h-3 mr-1" />
                            {insight.dueDate}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-pretty">{insight.text}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Users className="w-3 h-3 mr-1" />
                        {insight.participants.join(", ")}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {!isAnalyzing && insights.length === 0 && (
          <div className="text-center py-8">
            <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">
              Click "Generate Insights" to analyze your meeting content with AI
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
