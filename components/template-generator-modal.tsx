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
import { Progress } from "@/components/ui/progress"
import { Brain, Sparkles, CheckCircle } from "lucide-react"

interface TemplateGeneratorModalProps {
  trigger: React.ReactNode
}

export function TemplateGeneratorModal({ trigger }: TemplateGeneratorModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generatedTemplate, setGeneratedTemplate] = useState(null)

  const [formData, setFormData] = useState({
    projectName: "",
    industry: "",
    projectType: "",
    complexity: "",
    teamSize: "",
    timeline: "",
    description: "",
  })

  const industries = ["Software", "E-commerce", "Consulting", "Healthcare", "Finance", "Marketing"]
  const projectTypes = [
    "Web Application",
    "Mobile App",
    "API Development",
    "Data Migration",
    "Marketing Campaign",
    "Process Improvement",
  ]
  const complexities = ["Simple", "Medium", "Complex"]
  const teamSizes = ["1-3 people", "4-7 people", "8-15 people", "15+ people"]
  const timelines = ["1-2 weeks", "3-4 weeks", "1-2 months", "3-6 months", "6+ months"]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generateTemplate = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate AI generation progress
    const progressInterval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 10
      })
    }, 300)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const mockTemplate = {
        name: `${formData.projectName} Implementation`,
        description: `AI-generated template for ${formData.projectType.toLowerCase()} in ${formData.industry.toLowerCase()}`,
        tasks: 15,
        estimatedTime: formData.timeline,
        complexity: formData.complexity,
      }

      setGeneratedTemplate(mockTemplate)
    } catch (error) {
      console.error("Generation failed:", error)
    } finally {
      setIsGenerating(false)
      clearInterval(progressInterval)
    }
  }

  const resetForm = () => {
    setFormData({
      projectName: "",
      industry: "",
      projectType: "",
      complexity: "",
      teamSize: "",
      timeline: "",
      description: "",
    })
    setGeneratedTemplate(null)
    setGenerationProgress(0)
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
            <Brain className="w-5 h-5 mr-2" />
            AI Template Generator
          </DialogTitle>
          <DialogDescription>
            Generate a custom project template based on your specific requirements and industry best practices.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!generatedTemplate ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    placeholder="e.g., Customer Portal Redesign"
                    value={formData.projectName}
                    onChange={(e) => handleInputChange("projectName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectType">Project Type</Label>
                  <Select
                    value={formData.projectType}
                    onValueChange={(value) => handleInputChange("projectType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complexity">Complexity</Label>
                  <Select value={formData.complexity} onValueChange={(value) => handleInputChange("complexity", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select complexity" />
                    </SelectTrigger>
                    <SelectContent>
                      {complexities.map((complexity) => (
                        <SelectItem key={complexity} value={complexity}>
                          {complexity}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Select value={formData.teamSize} onValueChange={(value) => handleInputChange("teamSize", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamSizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline</Label>
                  <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      {timelines.map((timeline) => (
                        <SelectItem key={timeline} value={timeline}>
                          {timeline}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Provide additional context about your project goals, constraints, or specific requirements..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                />
              </div>

              {isGenerating && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Generating your custom template...</span>
                    <span className="text-muted-foreground">{generationProgress}%</span>
                  </div>
                  <Progress value={generationProgress} className="w-full" />
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span>Analyzing industry best practices and your requirements</span>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={generateTemplate}
                  disabled={isGenerating || !formData.projectName || !formData.industry || !formData.projectType}
                >
                  {isGenerating ? (
                    <>
                      <Brain className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Template
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-primary">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Template Generated Successfully!</span>
              </div>

              <div className="p-4 bg-muted rounded-lg space-y-3">
                <h3 className="font-medium text-balance">{generatedTemplate.name}</h3>
                <p className="text-sm text-muted-foreground text-pretty">{generatedTemplate.description}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <span>
                    <strong>{generatedTemplate.tasks}</strong> tasks
                  </span>
                  <span>
                    <strong>{generatedTemplate.estimatedTime}</strong> timeline
                  </span>
                  <span>
                    <strong>{generatedTemplate.complexity}</strong> complexity
                  </span>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={resetForm}>
                  Generate Another
                </Button>
                <Button onClick={() => setIsOpen(false)}>Use This Template</Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
