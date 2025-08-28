"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookTemplate as FileTemplate, Zap, Users, Code, Brain, Plus, Search, Filter } from "lucide-react"
import { TemplateGeneratorModal } from "@/components/template-generator-modal"

interface ProjectTemplate {
  id: string
  name: string
  description: string
  icon: any
  category: string
  industry: string
  complexity: "Simple" | "Medium" | "Complex"
  estimatedTime: string
  tasks: number
  color: string
  isAIGenerated?: boolean
  tags: string[]
}

const templates: ProjectTemplate[] = [
  {
    id: "1",
    name: "Sprint Planning",
    description: "Agile sprint planning template with user stories and acceptance criteria",
    icon: Zap,
    category: "Agile",
    industry: "Software",
    complexity: "Medium",
    estimatedTime: "2-3 weeks",
    tasks: 12,
    color: "bg-chart-1",
    tags: ["agile", "scrum", "planning"],
  },
  {
    id: "2",
    name: "Team Standup",
    description: "Daily standup meeting structure with progress tracking",
    icon: Users,
    category: "Daily",
    industry: "General",
    complexity: "Simple",
    estimatedTime: "1 week",
    tasks: 5,
    color: "bg-chart-2",
    tags: ["daily", "standup", "tracking"],
  },
  {
    id: "3",
    name: "Code Review",
    description: "Technical code review checklist with quality gates",
    icon: Code,
    category: "Development",
    industry: "Software",
    complexity: "Complex",
    estimatedTime: "3-4 weeks",
    tasks: 18,
    color: "bg-chart-3",
    tags: ["code", "review", "quality"],
  },
  {
    id: "4",
    name: "Product Launch",
    description: "AI-generated template for product launch coordination",
    icon: Brain,
    category: "Marketing",
    industry: "E-commerce",
    complexity: "Complex",
    estimatedTime: "6-8 weeks",
    tasks: 25,
    color: "bg-primary",
    isAIGenerated: true,
    tags: ["launch", "marketing", "coordination"],
  },
  {
    id: "5",
    name: "Client Onboarding",
    description: "AI-generated client onboarding process template",
    icon: Users,
    category: "Sales",
    industry: "Consulting",
    complexity: "Medium",
    estimatedTime: "3-4 weeks",
    tasks: 15,
    color: "bg-chart-5",
    isAIGenerated: true,
    tags: ["onboarding", "client", "process"],
  },
]

const industries = ["All", "Software", "E-commerce", "Consulting", "Healthcare", "Finance", "General"]
const categories = ["All", "Agile", "Daily", "Development", "Marketing", "Sales", "Operations"]
const complexities = ["All", "Simple", "Medium", "Complex"]

export function ProjectTemplates() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("All")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedComplexity, setSelectedComplexity] = useState("All")
  const [isGenerating, setIsGenerating] = useState(false)
  const [filteredTemplates, setFilteredTemplates] = useState(templates)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterTemplates(term, selectedIndustry, selectedCategory, selectedComplexity)
  }

  const filterTemplates = (search: string, industry: string, category: string, complexity: string) => {
    const filtered = templates.filter((template) => {
      const matchesSearch =
        template.name.toLowerCase().includes(search.toLowerCase()) ||
        template.description.toLowerCase().includes(search.toLowerCase()) ||
        template.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))

      const matchesIndustry = industry === "All" || template.industry === industry
      const matchesCategory = category === "All" || template.category === category
      const matchesComplexity = complexity === "All" || template.complexity === complexity

      return matchesSearch && matchesIndustry && matchesCategory && matchesComplexity
    })

    setFilteredTemplates(filtered)
  }

  const handleFilterChange = (type: string, value: string) => {
    switch (type) {
      case "industry":
        setSelectedIndustry(value)
        filterTemplates(searchTerm, value, selectedCategory, selectedComplexity)
        break
      case "category":
        setSelectedCategory(value)
        filterTemplates(searchTerm, selectedIndustry, value, selectedComplexity)
        break
      case "complexity":
        setSelectedComplexity(value)
        filterTemplates(searchTerm, selectedIndustry, selectedCategory, value)
        break
    }
  }

  const generateAITemplate = async () => {
    setIsGenerating(true)
    // Simulate AI template generation
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsGenerating(false)

    // In a real implementation, this would call an API to generate a template
    // based on recent meeting context and industry patterns
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Simple":
        return "bg-chart-2 text-chart-3"
      case "Medium":
        return "bg-chart-5 text-white"
      case "Complex":
        return "bg-destructive text-destructive-foreground"
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
              <FileTemplate className="w-5 h-5 mr-2" />
              Project Templates
            </CardTitle>
            <CardDescription>AI-generated templates based on your industry and meetings</CardDescription>
          </div>
          <Button
            onClick={generateAITemplate}
            disabled={isGenerating}
            size="sm"
            className="bg-primary text-primary-foreground"
          >
            {isGenerating ? (
              <>
                <Brain className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                AI Generate
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={selectedIndustry} onValueChange={(value) => handleFilterChange("industry", value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={(value) => handleFilterChange("category", value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedComplexity} onValueChange={(value) => handleFilterChange("complexity", value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
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
        </div>

        {/* Templates Grid */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${template.color} rounded-lg flex items-center justify-center relative`}>
                  <template.icon className="w-6 h-6 text-white" />
                  {template.isAIGenerated && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                      <Brain className="w-2 h-2 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-sm">{template.name}</h4>
                    {template.isAIGenerated && (
                      <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
                        AI Generated
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground text-pretty mb-2">{template.description}</p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {template.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {template.industry}
                    </Badge>
                    <Badge className={`text-xs ${getComplexityColor(template.complexity)}`}>
                      {template.complexity}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                    <span>{template.tasks} tasks</span>
                    <span>{template.estimatedTime}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  Preview
                </Button>
                <Button size="sm">Use Template</Button>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-8">
            <FileTemplate className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-muted-foreground mb-2">No templates found</p>
            <p className="text-xs text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}

        <div className="flex space-x-2">
          <TemplateGeneratorModal
            trigger={
              <Button variant="outline" className="flex-1 bg-transparent">
                <Brain className="w-4 h-4 mr-2" />
                AI Generate Template
              </Button>
            }
          />
          <Button variant="outline" className="flex-1 bg-transparent">
            <Plus className="w-4 h-4 mr-2" />
            Create Custom Template
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
