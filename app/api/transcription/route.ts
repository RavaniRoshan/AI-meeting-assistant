import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { audioData, meetingId } = await request.json()

    // Simulate AI transcription processing
    // In a real implementation, this would integrate with speech-to-text services
    // like OpenAI Whisper, Google Speech-to-Text, or Azure Speech Services

    const mockTranscription = {
      id: Date.now().toString(),
      speaker: "Unknown Speaker",
      text: "This is a simulated transcription result...",
      timestamp: new Date().toLocaleTimeString(),
      confidence: 0.85 + Math.random() * 0.15,
      avatar: "US",
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      transcription: mockTranscription,
      insights: [
        {
          type: "key_point",
          text: "Important discussion point identified",
          participants: ["Unknown Speaker"],
        },
      ],
    })
  } catch (error) {
    console.error("Transcription error:", error)
    return NextResponse.json({ success: false, error: "Failed to process transcription" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const meetingId = searchParams.get("meetingId")

  if (!meetingId) {
    return NextResponse.json({ error: "Meeting ID is required" }, { status: 400 })
  }

  // Return mock meeting transcription data
  const mockData = {
    meetingId,
    transcript: [
      {
        id: "1",
        speaker: "John Smith",
        text: "We need to prioritize the user authentication feature for the next sprint.",
        timestamp: "14:32",
        confidence: 0.95,
        avatar: "JS",
      },
      {
        id: "2",
        speaker: "Maria Johnson",
        text: "I agree. Let's also consider the database schema changes needed.",
        timestamp: "14:33",
        confidence: 0.92,
        avatar: "MJ",
      },
    ],
    insights: [
      {
        type: "action_item",
        text: "Prioritize user authentication feature for next sprint",
        participants: ["John Smith"],
      },
      {
        type: "decision",
        text: "AI integration will be implemented after authentication foundation",
        participants: ["John Smith", "Maria Johnson"],
      },
    ],
    summary: "Team discussed sprint priorities, focusing on authentication before AI features.",
  }

  return NextResponse.json(mockData)
}
