import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const status = searchParams.get("status")

  // Mock integration data
  const integrations = [
    {
      id: "slack",
      name: "Slack",
      status: "connected",
      category: "Communication",
      lastSync: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      health: 98,
      dataPoints: { messages: 1247, tasks: 89 },
    },
    {
      id: "jira",
      name: "Jira",
      status: "connected",
      category: "Project Management",
      lastSync: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      health: 95,
      dataPoints: { tasks: 156 },
    },
    // ... more integrations
  ]

  let filtered = integrations
  if (category && category !== "all") {
    filtered = filtered.filter((i) => i.category === category)
  }
  if (status && status !== "all") {
    filtered = filtered.filter((i) => i.status === status)
  }

  return NextResponse.json({
    integrations: filtered,
    total: filtered.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const { integrationId, config } = await request.json()

    // Mock integration setup
    const newIntegration = {
      id: integrationId,
      status: "connected",
      connectedAt: new Date().toISOString(),
      config,
    }

    // Simulate setup time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      integration: newIntegration,
    })
  } catch (error) {
    console.error("Integration setup error:", error)
    return NextResponse.json({ success: false, error: "Failed to setup integration" }, { status: 500 })
  }
}
