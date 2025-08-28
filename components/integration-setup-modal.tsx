"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageSquare,
  CheckCircle,
  Calendar,
  FileText,
  BarChart3,
  Users,
  ExternalLink,
  Key,
  Zap,
  CheckCircle2,
} from "lucide-react"

interface IntegrationSetupModalProps {
  trigger: React.ReactNode
}

const availableIntegrations = [
  {
    id: "slack",
    name: "Slack",
    description: "Send meeting summaries and task notifications to Slack channels",
    icon: MessageSquare,
    category: "Communication",
    setupType: "oauth",
    features: ["Meeting summaries", "Task notifications", "AI insights", "Channel sync"],
    popular: true,
  },
  {
    id: "jira",
    name: "Jira",
    description: "Create and manage Jira tickets from meeting action items",
    icon: CheckCircle,
    category: "Project Management",
    setupType: "api_key",
    features: ["Ticket creation", "Status updates", "Sprint planning", "Custom fields"],
    popular: true,
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Sync meeting schedules and automatically join calls",
    icon: Calendar,
    category: "Calendar",
    setupType: "oauth",
    features: ["Meeting scheduling", "Auto-join", "Calendar sync", "Reminders"],
    popular: false,
  },
  {
    id: "notion",
    name: "Notion",
    description: "Export meeting notes and project templates to Notion",
    icon: FileText,
    category: "Storage",
    setupType: "api_key",
    features: ["Meeting notes", "Template export", "Knowledge base", "Database sync"],
    popular: false,
  },
  {
    id: "trello",
    name: "Trello",
    description: "Create Trello cards from meeting action items",
    icon: BarChart3,
    category: "Project Management",
    setupType: "api_key",
    features: ["Card creation", "Board sync", "Due dates", "Labels"],
    popular: false,
  },
  {
    id: "microsoft-teams",
    name: "Microsoft Teams",
    description: "Join Teams meetings and sync with channels",
    icon: Users,
    category: "Communication",
    setupType: "oauth",
    features: ["Meeting join", "Channel sync", "File sharing", "Notifications"],
    popular: true,
  },
]

const categories = ["All", "Popular", "Project Management", "Communication", "Calendar", "Storage"]

export function IntegrationSetupModal({ trigger }: IntegrationSetupModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("Popular")
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStep, setConnectionStep] = useState(1)
  const [formData, setFormData] = useState({
    apiKey: "",
    serverUrl: "",
    projectKey: "",
    channelId: "",
  })

  const filteredIntegrations = availableIntegrations.filter((integration) => {
    if (selectedCategory === "All") return true
    if (selectedCategory === "Popular") return integration.popular
    return integration.category === selectedCategory
  })

  const handleConnect = async () => {
    setIsConnecting(true)

    try {
      // Simulate connection process
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setConnectionStep(3) // Success step
    } catch (error) {
      console.error("Connection failed:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const resetModal = () => {
    setSelectedIntegration(null)
    setConnectionStep(1)
    setFormData({
      apiKey: "",
      serverUrl: "",
      projectKey: "",
      channelId: "",
    })
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) resetModal()
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-balance">
            <Zap className="w-5 h-5 mr-2" />
            Add New Integration
          </DialogTitle>
          <DialogDescription>Connect your favorite tools to sync meeting data and automate workflows</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!selectedIntegration ? (
            <>
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="grid w-full grid-cols-6">
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category} className="text-xs">
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value={selectedCategory} className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredIntegrations.map((integration) => (
                      <div
                        key={integration.id}
                        className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => setSelectedIntegration(integration)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                            <integration.icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-medium text-sm">{integration.name}</h3>
                              {integration.popular && (
                                <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground text-pretty mb-3">{integration.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {integration.features.slice(0, 2).map((feature, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                              {integration.features.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{integration.features.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <div className="space-y-6">
              {/* Integration Header */}
              <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                <div className="w-16 h-16 bg-background rounded-lg flex items-center justify-center">
                  <selectedIntegration.icon className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{selectedIntegration.name}</h3>
                  <p className="text-sm text-muted-foreground text-pretty">{selectedIntegration.description}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="outline">{selectedIntegration.category}</Badge>
                    <Badge variant="outline" className="text-xs">
                      {selectedIntegration.setupType === "oauth" ? "OAuth" : "API Key"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Connection Steps */}
              <div className="space-y-4">
                {connectionStep === 1 && (
                  <div className="space-y-4">
                    <h4 className="font-medium">Configure Connection</h4>

                    {selectedIntegration.setupType === "api_key" ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="apiKey">API Key</Label>
                          <Input
                            id="apiKey"
                            type="password"
                            placeholder="Enter your API key"
                            value={formData.apiKey}
                            onChange={(e) => setFormData((prev) => ({ ...prev, apiKey: e.target.value }))}
                          />
                        </div>

                        {selectedIntegration.id === "jira" && (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="serverUrl">Server URL</Label>
                              <Input
                                id="serverUrl"
                                placeholder="https://yourcompany.atlassian.net"
                                value={formData.serverUrl}
                                onChange={(e) => setFormData((prev) => ({ ...prev, serverUrl: e.target.value }))}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="projectKey">Project Key</Label>
                              <Input
                                id="projectKey"
                                placeholder="e.g., PROJ"
                                value={formData.projectKey}
                                onChange={(e) => setFormData((prev) => ({ ...prev, projectKey: e.target.value }))}
                              />
                            </div>
                          </>
                        )}

                        {selectedIntegration.id === "slack" && (
                          <div className="space-y-2">
                            <Label htmlFor="channelId">Default Channel ID</Label>
                            <Input
                              id="channelId"
                              placeholder="e.g., #general"
                              value={formData.channelId}
                              onChange={(e) => setFormData((prev) => ({ ...prev, channelId: e.target.value }))}
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Key className="w-4 h-4" />
                          <span className="font-medium text-sm">OAuth Authentication</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          You'll be redirected to {selectedIntegration.name} to authorize the connection.
                        </p>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Learn about permissions
                        </Button>
                      </div>
                    )}

                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Features to Enable</h5>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedIntegration.features.map((feature: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2 p-2 border rounded">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {connectionStep === 2 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-primary-foreground animate-pulse" />
                    </div>
                    <h4 className="font-medium mb-2">Connecting to {selectedIntegration.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Setting up your integration and testing the connection...
                    </p>
                  </div>
                )}

                {connectionStep === 3 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-chart-2 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-medium mb-2">Successfully Connected!</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedIntegration.name} is now connected and ready to sync your meeting data.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setSelectedIntegration(null)}>
                  Back
                </Button>
                <div className="space-x-2">
                  {connectionStep === 1 && (
                    <Button
                      onClick={() => {
                        setConnectionStep(2)
                        handleConnect()
                      }}
                      disabled={selectedIntegration.setupType === "api_key" && !formData.apiKey}
                    >
                      Connect {selectedIntegration.name}
                    </Button>
                  )}
                  {connectionStep === 3 && <Button onClick={() => setIsOpen(false)}>Done</Button>}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
