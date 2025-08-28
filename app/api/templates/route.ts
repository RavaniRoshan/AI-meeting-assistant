import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const industry = searchParams.get("industry")
  const category = searchParams.get("category")
  const complexity = searchParams.get("complexity")

  // Mock template data with filtering
  const allTemplates = [
    {
      id: "1",
      name: "Sprint Planning",
      description: "Agile sprint planning template with user stories and acceptance criteria",
      category: "Agile",
      industry: "Software",
      complexity: "Medium",
      estimatedTime: "2-3 weeks",
      tasks: 12,
      isAIGenerated: false,
      tags: ["agile", "scrum", "planning"],
    },
    {
      id: "2",
      name: "Product Launch",
      description: "AI-generated template for product launch coordination",
      category: "Marketing",
      industry: "E-commerce",
      complexity: "Complex",
      estimatedTime: "6-8 weeks",
      tasks: 25,
      isAIGenerated: true,
      tags: ["launch", "marketing", "coordination"],
    },
    // ... more templates
  ]

  let filteredTemplates = allTemplates

  if (industry && industry !== "All") {
    filteredTemplates = filteredTemplates.filter((t) => t.industry === industry)
  }
  if (category && category !== "All") {
    filteredTemplates = filteredTemplates.filter((t) => t.category === category)
  }
  if (complexity && complexity !== "All") {
    filteredTemplates = filteredTemplates.filter((t) => t.complexity === complexity)
  }

  return NextResponse.json({
    templates: filteredTemplates,
    total: filteredTemplates.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const templateData = await request.json()

    // Mock template creation
    const newTemplate = {
      id: Date.now().toString(),
      ...templateData,
      createdAt: new Date().toISOString(),
      isAIGenerated: false,
    }

    return NextResponse.json({
      success: true,
      template: newTemplate,
    })
  } catch (error) {
    console.error("Template creation error:", error)
    return NextResponse.json({ success: false, error: "Failed to create template" }, { status: 500 })
  }
}
