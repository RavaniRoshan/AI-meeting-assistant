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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Brain, CalendarIcon, Zap } from "lucide-react"
import { format } from "date-fns"

interface TeamMember {
  id: string
  name: string
  avatar: string
  skills: string[]
  availability: number
  currentWorkload: number
  maxCapacity: number
  timezone: string
}

interface TaskAssignmentModalProps {
  trigger: React.ReactNode
  teamMembers: TeamMember[]
  onTaskCreate: (task: any) => void
}

const skillOptions = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "SQL",
  "Database",
  "DevOps",
  "AWS",
  "Docker",
  "CI/CD",
  "UI/UX",
  "Design",
  "Frontend",
  "Backend",
  "Testing",
  "Architecture",
  "Security",
]

export function TaskAssignmentModal({ trigger, teamMembers, onTaskCreate }: TaskAssignmentModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    estimatedHours: "",
    skills: [] as string[],
    assignee: "",
    dueDate: "",
  })

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addSkill = (skill: string) => {
    if (!formData.skills.includes(skill)) {
      handleInputChange("skills", [...formData.skills, skill])
    }
  }

  const removeSkill = (skill: string) => {
    handleInputChange(
      "skills",
      formData.skills.filter((s) => s !== skill),
    )
  }

  const analyzeAssignment = async () => {
    setIsAnalyzing(true)

    try {
      // Simulate AI analysis
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate AI suggestions based on skills and availability
      const suggestions = teamMembers
        .filter(
          (member) => formData.skills.some((skill) => member.skills.includes(skill)) || formData.skills.length === 0,
        )
        .map((member) => {
          const skillMatch =
            formData.skills.length === 0
              ? 0.5
              : formData.skills.filter((skill) => member.skills.includes(skill)).length / formData.skills.length
          const availabilityScore = member.availability / 100
          const workloadScore = 1 - member.currentWorkload / member.maxCapacity

          const confidence = skillMatch * 0.5 + availabilityScore * 0.3 + workloadScore * 0.2

          return {
            member,
            confidence,
            reasoning: `${Math.round(skillMatch * 100)}% skill match, ${member.availability}% available, ${member.maxCapacity - member.currentWorkload}h free capacity`,
          }
        })
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, 3)

      setAiSuggestions(suggestions)
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const selectSuggestion = (suggestion: any) => {
    handleInputChange("assignee", suggestion.member.name)
  }

  const createTask = () => {
    const newTask = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      assignee: formData.assignee,
      avatar: teamMembers.find((m) => m.name === formData.assignee)?.avatar || "??",
      priority: formData.priority,
      status: "Todo",
      dueDate: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
      estimatedHours: Number.parseInt(formData.estimatedHours) || 0,
      skills: formData.skills,
      dependencies: [],
      aiSuggested: aiSuggestions.length > 0,
      confidence: aiSuggestions.find((s) => s.member.name === formData.assignee)?.confidence,
    }

    onTaskCreate(newTask)
    setIsOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      priority: "",
      estimatedHours: "",
      skills: [],
      assignee: "",
      dueDate: "",
    })
    setAiSuggestions([])
    setSelectedDate(undefined)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) resetForm()
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-balance">
            <Zap className="w-5 h-5 mr-2" />
            Create Task with AI Assignment
          </DialogTitle>
          <DialogDescription>
            Create a new task and get AI-powered assignment recommendations based on team skills and availability.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                placeholder="e.g., Implement user authentication"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedHours">Estimated Hours</Label>
              <Input
                id="estimatedHours"
                type="number"
                placeholder="e.g., 16"
                value={formData.estimatedHours}
                onChange={(e) => handleInputChange("estimatedHours", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Provide details about the task requirements and acceptance criteria..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-3">
            <Label>Required Skills</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="cursor-pointer" onClick={() => removeSkill(skill)}>
                  {skill} ×
                </Badge>
              ))}
            </div>
            <Select onValueChange={addSkill}>
              <SelectTrigger>
                <SelectValue placeholder="Add required skills" />
              </SelectTrigger>
              <SelectContent>
                {skillOptions
                  .filter((skill) => !formData.skills.includes(skill))
                  .map((skill) => (
                    <SelectItem key={skill} value={skill}>
                      {skill}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Button onClick={analyzeAssignment} disabled={isAnalyzing || !formData.title} variant="outline" size="sm">
              {isAnalyzing ? (
                <>
                  <Brain className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Get AI Suggestions
                </>
              )}
            </Button>
            <span className="text-sm text-muted-foreground">AI will recommend the best team member for this task</span>
          </div>

          {aiSuggestions.length > 0 && (
            <div className="space-y-3">
              <Label>AI Assignment Recommendations</Label>
              <div className="space-y-2">
                {aiSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.assignee === suggestion.member.name ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                    }`}
                    onClick={() => selectSuggestion(suggestion)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {suggestion.member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{suggestion.member.name}</p>
                          <p className="text-xs text-muted-foreground">{suggestion.reasoning}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-xs">
                          {Math.round(suggestion.confidence * 100)}% match
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {suggestion.member.availability}% available
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="assignee">Assignee</Label>
            <Select value={formData.assignee} onValueChange={(value) => handleInputChange("assignee", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select team member" />
              </SelectTrigger>
              <SelectContent>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.name}>
                    <div className="flex items-center space-x-2">
                      <span>{member.name}</span>
                      <span className="text-xs text-muted-foreground">({member.availability}% available)</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={createTask} disabled={!formData.title || !formData.assignee || !formData.priority}>
              Create Task
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
