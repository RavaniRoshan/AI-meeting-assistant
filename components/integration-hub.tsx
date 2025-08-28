"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plug,
  CheckCircle,
  AlertTriangle,
  Clock,
  Settings,
  Send as Sync,
  Plus,
  ExternalLink,
  Zap,
  MessageSquare,
  Calendar,
  FileText,
  Users,
  BarChart3,
  CheckSquare,
} from "lucide-react"
import { IntegrationSetupModal } from "@/components/integration-setup-modal"

interface Integration {
  id: string
  name: string
  description: string
  icon: any
  category: "Project Management" | "Communication" | "Calendar" | "Analytics" | "Storage"
  status: "connected" | "disconnected" | "error" | "syncing"
  isEnabled: boolean
  lastSync?: string
  syncFrequency: string
  features: string[]
  connectionHealth: number
  dataPoints: {
    meetings?: number
    tasks?: number
    messages?: number
    events?: number
  }
}

const integrations: Integration[] = [
  {
    id: "slack",
    name: "Slack",
    description: "Sync meeting summaries and tasks to Slack channels",
    icon: MessageSquare,
    category: "Communication",
    status: "connected",
    isEnabled: true,
    lastSync: "2 minutes ago",
    syncFrequency: "Real-time",
    features: ["Meeting summaries", "Task notifications", "AI insights"],
    connectionHealth: 98,
    dataPoints: { messages: 1247, tasks: 89 },
  },
  {
    id: "jira",
    name: "Jira",
    description: "Create and update Jira tickets from meeting action items",
    icon: CheckCircle,
    category: "Project Management",
    status: "connected",
    isEnabled: true,
    lastSync: "5 minutes ago",
    syncFrequency: "Every 5 minutes",
    features: ["Task creation", "Status updates", "Sprint planning"],
    connectionHealth: 95,
    dataPoints: { tasks: 156 },
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Sync meeting schedules and automatically join calls",
    icon: Calendar,
    category: "Calendar",
    status: "connected",
    isEnabled: false,
    lastSync: "1 hour ago",
    syncFrequency: "Every 15 minutes",
    features: ["Meeting scheduling", "Auto-join", "Calendar sync"],
    connectionHealth: 87,
    dataPoints: { events: 45, meetings: 23 },
  },
  {
    id: "notion",
    name: "Notion",
    description: "Export meeting notes and project templates to Notion",
    icon: FileText,
    category: "Storage",
    status: "error",
    isEnabled: true,
    lastSync: "Failed",
    syncFrequency: "Daily",
    features: ["Meeting notes", "Template export", "Knowledge base"],
    connectionHealth: 0,
    dataPoints: { meetings: 0 },
  },
  {
    id: "trello",
    name: "Trello",
    description: "Create Trello cards from meeting action items",
    icon: BarChart3,
    category: "Project Management",
    status: "disconnected",
    isEnabled: false,
    lastSync: "Never",
    syncFrequency: "Every 10 minutes",
    features: ["Card creation", "Board sync", "Due dates"],
    connectionHealth: 0,
    dataPoints: {},
  },
  {
    id: "microsoft-teams",
    name: "Microsoft Teams",
    description: "Join Teams meetings and sync with channels",
    icon: Users,
    category: "Communication",
    status: "disconnected",
    isEnabled: false,
    lastSync: "Never",
    syncFrequency: "Real-time",
    features: ["Meeting join", "Channel sync", "File sharing"],
    connectionHealth: 0,
    dataPoints: {},
  },
]

const categories = ["All", "Project Management", "Communication", "Calendar", "Analytics", "Storage"]

export function IntegrationHub() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncProgress, setSyncProgress] = useState(0)

  const filteredIntegrations = integrations.filter(
    (integration) => selectedCategory === "All" || integration.category === selectedCategory,
  )

  const connectedCount = integrations.filter((i) => i.status === "connected").length
  const totalDataPoints = integrations.reduce((sum, integration) => {
    return sum + Object.values(integration.dataPoints).reduce((a, b) => a + b, 0)
  }, 0)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-4 h-4 text-chart-2" />
      case "error":
        return <AlertTriangle className="w-4 h-4 text-destructive" />
      case "syncing":
        return <Sync className="w-4 h-4 text-primary animate-spin" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-chart-2 text-chart-3"
      case "error":
        return "bg-destructive text-destructive-foreground"
      case "syncing":
        return "bg-primary text-primary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Project Management":
        return CheckSquare
      case "Communication":
        return MessageSquare
      case "Calendar":
        return Calendar
      case "Analytics":
        return BarChart3
      case "Storage":
        return FileText
      default:
        return Plug
    }
  }

  const syncAllIntegrations = async () => {
    setIsSyncing(true)
    setSyncProgress(0)

    const progressInterval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 20
      })
    }, 500)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2500))
    } finally {
      setIsSyncing(false)
      clearInterval(progressInterval)
    }
  }

  const toggleIntegration = (integrationId: string) => {
    // In a real implementation, this would call an API to enable/disable the integration
    console.log(`Toggling integration: ${integrationId}`)
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Plug className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{connectedCount}</p>
                <p className="text-sm text-muted-foreground">Connected</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Sync className="w-5 h-5 text-chart-5" />
              <div>
                <p className="text-2xl font-bold">{totalDataPoints}</p>
                <p className="text-sm text-muted-foreground">Data Points</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-chart-1" />
              <div>
                <p className="text-2xl font-bold">98%</p>
                <p className="text-sm text-muted-foreground">Avg Health</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-chart-2" />
              <div>
                <p className="text-2xl font-bold">2m</p>
                <p className="text-sm text-muted-foreground">Last Sync</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center text-balance">
                <Plug className="w-5 h-5 mr-2" />
                Integration Hub
              </CardTitle>
              <CardDescription>Connect your favorite tools and sync meeting data automatically</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={syncAllIntegrations} disabled={isSyncing} variant="outline" size="sm">
                {isSyncing ? (
                  <>
                    <Sync className="w-4 h-4 mr-2 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <Sync className="w-4 h-4 mr-2" />
                    Sync All
                  </>
                )}
              </Button>
              <IntegrationSetupModal
                trigger={
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Integration
                  </Button>
                }
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sync Progress */}
          {isSyncing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Syncing all integrations...</span>
                <span className="text-muted-foreground">{syncProgress}%</span>
              </div>
              <Progress value={syncProgress} className="w-full" />
            </div>
          )}

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-6">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="text-xs">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory} className="space-y-4 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredIntegrations.map((integration) => {
                  const CategoryIcon = getCategoryIcon(integration.category)
                  return (
                    <Card key={integration.id} className="relative">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                              <integration.icon className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="font-medium text-sm">{integration.name}</h3>
                              <p className="text-xs text-muted-foreground text-pretty">{integration.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(integration.status)}
                            <Switch
                              checked={integration.isEnabled}
                              onCheckedChange={() => toggleIntegration(integration.id)}
                              disabled={integration.status === "disconnected"}
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge className={getStatusColor(integration.status)} variant="secondary">
                              {integration.status}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <CategoryIcon className="w-3 h-3 mr-1" />
                              {integration.category}
                            </Badge>
                          </div>

                          {integration.status === "connected" && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Connection Health</span>
                                <span className="font-medium">{integration.connectionHealth}%</span>
                              </div>
                              <Progress value={integration.connectionHealth} className="h-1" />
                            </div>
                          )}

                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Last sync: {integration.lastSync}</span>
                            <span>{integration.syncFrequency}</span>
                          </div>

                          {Object.keys(integration.dataPoints).length > 0 && (
                            <div className="flex items-center space-x-4 text-xs">
                              {Object.entries(integration.dataPoints).map(([key, value]) => (
                                <div key={key} className="flex items-center space-x-1">
                                  <span className="text-muted-foreground capitalize">{key}:</span>
                                  <span className="font-medium">{value}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="flex flex-wrap gap-1">
                            {integration.features.slice(0, 3).map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {integration.features.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{integration.features.length - 3} more
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center space-x-2 pt-2">
                            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                              <Settings className="w-3 h-3 mr-2" />
                              Configure
                            </Button>
                            {integration.status === "connected" && (
                              <Button variant="outline" size="sm" className="bg-transparent">
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {filteredIntegrations.length === 0 && (
                <div className="text-center py-12">
                  <Plug className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">No integrations found</p>
                  <p className="text-xs text-muted-foreground">Try selecting a different category</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
