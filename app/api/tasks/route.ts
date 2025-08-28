import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const assignee = searchParams.get("assignee")
  const status = searchParams.get("status")
  const priority = searchParams.get("priority")

  // Mock task data with filtering
  const allTasks = [
    {
      id: "1",
      title: "Implement user authentication system",
      description: "Build secure login/logout functionality with JWT tokens",
      assignee: "John Smith",
      priority: "High",
      status: "In Progress",
      dueDate: "2024-01-15",
      estimatedHours: 16,
      actualHours: 8,
      skills: ["React", "Node.js", "Security"],
      aiSuggested: true,
      confidence: 0.92,
    },
    // ... more tasks
  ]

  let filteredTasks = allTasks

  if (assignee && assignee !== "all") {
    filteredTasks = filteredTasks.filter((t) => t.assignee === assignee)
  }
  if (status && status !== "all") {
    filteredTasks = filteredTasks.filter((t) => t.status === status)
  }
  if (priority && priority !== "all") {
    filteredTasks = filteredTasks.filter((t) => t.priority === priority)
  }

  return NextResponse.json({
    tasks: filteredTasks,
    total: filteredTasks.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const taskData = await request.json()

    // Mock task creation with AI assignment if requested
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      createdAt: new Date().toISOString(),
      status: "Todo",
    }

    return NextResponse.json({
      success: true,
      task: newTask,
    })
  } catch (error) {
    console.error("Task creation error:", error)
    return NextResponse.json({ success: false, error: "Failed to create task" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { taskId, updates } = await request.json()

    // Mock task update
    const updatedTask = {
      id: taskId,
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      task: updatedTask,
    })
  } catch (error) {
    console.error("Task update error:", error)
    return NextResponse.json({ success: false, error: "Failed to update task" }, { status: 500 })
  }
}
