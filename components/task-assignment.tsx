"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckSquare, Clock, AlertCircle, Plus, Brain, Users, Target, Zap } from "lucide-react"
import { TaskAssignmentModal } from "@/components/task-assignment-modal"

interface Task {
  id: string
  title: string
  description?: string
  assignee: string
  avatar: string
  priority: "Low" | "Medium" | "High"
  status: "Todo" | "In Progress" | "Review" | "Done"
  dueDate: string
  estimatedHours: number
  actualHours?: number
  skills: string[]
  dependencies: string[]
  aiSuggested?: boolean
  confidence?: number
  meetingSource?: string
}

interface TeamMember {
  id: string
  name: string
  avatar: string
  skills: string[]
  availability: number // percentage
  currentWorkload: number // hours this week
  maxCapacity: number // max hours per week
  timezone: string
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Smith",
    avatar: "JS",
    skills: ["React", "TypeScript", "Node.js", "Architecture"],
    availability: 85,
    currentWorkload: 34,
    maxCapacity: 40,
    timezone: "EST",
  },
  {
    id: "2",
    name: "Maria Johnson",
    avatar: "MJ",
    skills: ["Database", "SQL", "Python", "Data Analysis"],
    availability: 90,
    currentWorkload: 28,
    maxCapacity: 40,
    timezone: "PST",
  },
  {
    id: "3",
    name: "Alex Chen",
    avatar: "AC",
    skills: ["DevOps", "AWS", "Docker", "CI/CD"],
    availability: 75,
    currentWorkload: 38,
    maxCapacity: 40,
    timezone: "EST",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    avatar: "SW",
    skills: ["UI/UX", "Design", "Frontend", "Testing"],
    availability: 95,
    currentWorkload: 25,
    maxCapacity: 40,
    timezone: "CST",
  },
]

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Implement user authentication system",
    description: "Build secure login/logout functionality with JWT tokens",
    assignee: "John Smith",
    avatar: "JS",
    priority: "High",
    status: "In Progress",
    dueDate: "2024-01-15",
    estimatedHours: 16,
    actualHours: 8,
    skills: ["React", "Node.js", "Security"],
    dependencies: [],
    aiSuggested: true,
    confidence: 0.92,
    meetingSource: "Product Planning Session",
  },
  {
    id: "2",
    title: "Design database schema for new features",
    description: "Create normalized database structure for user data and preferences",
    assignee: "Maria Johnson",
    avatar: "MJ",
    priority: "Medium",
    status: "Todo",
    dueDate: "2024-01-18",
    estimatedHours: 12,
    skills: ["Database", "SQL", "Architecture"],
    dependencies: [],
    aiSuggested: true,
    confidence: 0.88,
    meetingSource: "Product Planning Session",
  },
  {
    id: "3",
    title: "Set up CI/CD pipeline",
    description: "Configure automated testing and deployment pipeline",
    assignee: "Alex Chen",
    avatar: "AC",
    priority: "Low",
    status: "Review",
    dueDate: "2024-01-20",
    estimatedHours: 20,
    actualHours: 18,
    skills: ["DevOps", "CI/CD", "AWS"],
    dependencies: ["1"],
    aiSuggested: false,
    confidence: 0.95,
  },
]

export function TaskAssignment() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [selectedMember, setSelectedMember] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const runAIAssignment = async () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simulate AI analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 12
      })
    }, 200)

    try {
      // Simulate AI assignment analysis
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock AI suggestions for task reassignment
      const updatedTasks = tasks.map((task) => {
        if (task.status === "Todo") {
          // AI suggests optimal assignee based on skills and availability
          const bestMatch = findBestAssignee(task)
          return {
            ...task,
            assignee: bestMatch.name,
            avatar: bestMatch.avatar,
            aiSuggested: true,
            confidence: 0.85 + Math.random() * 0.15,
          }
        }
        return task
      })

      setTasks(updatedTasks)
    } catch (error) {
      console.error("AI assignment failed:", error)
    } finally {
      setIsAnalyzing(false)
      clearInterval(progressInterval)
    }
  }

  const findBestAssignee = (task: Task): TeamMember => {
    // Simple AI logic to find best assignee based on skills and availability
    const candidates = teamMembers.filter(
      (member) => task.skills.some((skill) => member.skills.includes(skill)) && member.availability > 70,
    )

    if (candidates.length === 0) return teamMembers[0]

    // Return member with highest availability and matching skills
    return candidates.reduce((best, current) => (current.availability > best.availability ? current : best))
  }

  const filteredTasks = tasks.filter((task) => {
    const memberMatch = selectedMember === "all" || task.assignee === selectedMember
    const statusMatch = selectedStatus === "all" || task.status === selectedStatus
    return memberMatch && statusMatch
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-destructive text-destructive-foreground"
      case "Medium":
        return "bg-chart-5 text-white"
      case "Low":
        return "bg-chart-2 text-chart-3"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-primary text-primary-foreground"
      case "Todo":
        return "bg-muted text-muted-foreground"
      case "Review":
        return "bg-chart-5 text-white"
      case "Done":
        return "bg-chart-2 text-chart-3"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getProgressPercentage = (task: Task) => {
    if (task.status === "Done") return 100
    if (task.status === "Review") return 90
    if (task.status === "In Progress" && task.actualHours) {
      return Math.min((task.actualHours / task.estimatedHours) * 100, 90)
    }
    return 0
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-balance">
              <Target className="w-5 h-5 mr-2" />
              AI Task Assignment Engine
            </CardTitle>
            <CardDescription>
              Intelligent task assignment based on skills, availability, and meeting context
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={runAIAssignment} disabled={isAnalyzing} size="sm" variant="outline">
              {isAnalyzing ? (
                <>
                  <Brain className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  AI Optimize
                </>
              )}
            </Button>
            <TaskAssignmentModal
              trigger={
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              }
              teamMembers={teamMembers}
              onTaskCreate={(newTask) => setTasks((prev) => [...prev, newTask])}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* AI Analysis Progress */}
        {isAnalyzing && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Analyzing team capacity and skills...</span>
              <span className="text-muted-foreground">{analysisProgress}%</span>
            </div>
            <Progress value={analysisProgress} className="w-full" />
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 animate-pulse" />
              <span>Optimizing task assignments based on team expertise</span>
            </div>
          </div>
        )}

        {/* Team Capacity Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="p-3 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {member.avatar}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{member.name.split(" ")[0]}</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Availability</span>
                  <span className="font-medium">{member.availability}%</span>
                </div>
                <Progress value={member.availability} className="h-1" />
                <div className="text-xs text-muted-foreground">
                  {member.currentWorkload}h / {member.maxCapacity}h
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <Select value={selectedMember} onValueChange={setSelectedMember}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Members</SelectItem>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.name}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <CheckSquare className="w-4 h-4 text-muted-foreground" />
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Todo">Todo</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Review">Review</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div key={task.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={`/abstract-geometric-shapes.png?height=40&width=40&query=${task.assignee} avatar`}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground">{task.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-sm text-pretty">{task.title}</h4>
                      {task.aiSuggested && (
                        <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
                          <Brain className="w-3 h-3 mr-1" />
                          AI Suggested
                        </Badge>
                      )}
                      {task.confidence && (
                        <Badge variant="outline" className="text-xs">
                          {Math.round(task.confidence * 100)}% match
                        </Badge>
                      )}
                    </div>

                    {task.description && (
                      <p className="text-xs text-muted-foreground text-pretty">{task.description}</p>
                    )}

                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{task.assignee}</span>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {task.dueDate}
                      </div>
                      <span>{task.estimatedHours}h estimated</span>
                      {task.meetingSource && <span className="text-primary">From: {task.meetingSource}</span>}
                    </div>

                    {/* Skills Required */}
                    <div className="flex items-center space-x-1">
                      {task.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    {task.status !== "Todo" && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-muted-foreground">{getProgressPercentage(task)}%</span>
                        </div>
                        <Progress value={getProgressPercentage(task)} className="h-1" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge className={getPriorityColor(task.priority)} variant="secondary">
                    {task.priority}
                  </Badge>
                  <Badge className={getStatusColor(task.status)} variant="secondary">
                    {task.status}
                  </Badge>
                </div>
              </div>

              {/* Dependencies */}
              {task.dependencies.length > 0 && (
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <AlertCircle className="w-3 h-3" />
                  <span>Depends on: {task.dependencies.join(", ")}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-8">
            <CheckSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-muted-foreground mb-2">No tasks found</p>
            <p className="text-xs text-muted-foreground">Try adjusting your filters or add new tasks</p>
          </div>
        )}

        {/* AI Suggestions Panel */}
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">AI Recommendations</span>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Sarah Wilson has 15h available capacity this week - consider assigning UI tasks</p>
            <p>• John Smith is at 85% capacity - redistribute high-priority tasks if needed</p>
            <p>• Database tasks are well-matched to Maria Johnson's expertise (92% confidence)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
