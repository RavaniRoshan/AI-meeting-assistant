import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { taskId, teamMembers, taskRequirements } = await request.json()

    // Simulate AI assignment analysis
    // In a real implementation, this would use AI SDK with models like GPT-4
    // to analyze team member skills, availability, and task requirements

    const assignmentAnalysis = teamMembers
      .map((member: any) => {
        // Calculate skill match score
        const skillMatch =
          taskRequirements.skills?.length > 0
            ? taskRequirements.skills.filter((skill: string) => member.skills.includes(skill)).length /
              taskRequirements.skills.length
            : 0.5

        // Calculate availability score
        const availabilityScore = member.availability / 100

        // Calculate workload score (lower workload = higher score)
        const workloadScore = 1 - member.currentWorkload / member.maxCapacity

        // Calculate timezone compatibility (simplified)
        const timezoneScore = 0.8 // Assume good compatibility for now

        // Weighted confidence score
        const confidence = skillMatch * 0.4 + availabilityScore * 0.3 + workloadScore * 0.2 + timezoneScore * 0.1

        return {
          memberId: member.id,
          memberName: member.name,
          confidence,
          skillMatch: Math.round(skillMatch * 100),
          availability: member.availability,
          freeCapacity: member.maxCapacity - member.currentWorkload,
          reasoning: `${Math.round(skillMatch * 100)}% skill match, ${member.availability}% available, ${member.maxCapacity - member.currentWorkload}h free capacity`,
        }
      })
      .sort((a: any, b: any) => b.confidence - a.confidence)

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      recommendations: assignmentAnalysis.slice(0, 3),
      bestMatch: assignmentAnalysis[0],
      reasoning: `Based on skill requirements, team availability, and current workload distribution, ${assignmentAnalysis[0].memberName} is the optimal choice for this task.`,
    })
  } catch (error) {
    console.error("Task assignment error:", error)
    return NextResponse.json({ success: false, error: "Failed to analyze task assignment" }, { status: 500 })
  }
}
