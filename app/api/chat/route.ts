import { NextResponse } from 'next/server'
import { SITE_KNOWLEDGE_TEXT, getAssistantResponse } from '@/lib/ai-knowledge'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const message = body?.message || ''

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ reply: getAssistantResponse('hello') })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (
      apiKey &&
      apiKey !== 'your_actual_api_key_goes_here' &&
      apiKey.trim() !== ''
    ) {
      try {
        const { GoogleGenerativeAI } = await import('@google/generative-ai')
        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

        const prompt = `${SITE_KNOWLEDGE_TEXT}\n\nUser Question: ${message}\n\nPlease answer accurately as Gara AI Assistant, representing Gara Media (Gara Digitals). Keep responses concise, professional, and well-formatted with markdown:`

        const result = await model.generateContent(prompt)
        const text = result.response.text()
        if (text && text.trim()) {
          return NextResponse.json({ reply: text })
        }
      } catch (err) {
        console.warn('Gemini API call skipped or failed, using site knowledge fallback:', err)
      }
    }

    const fallbackReply = getAssistantResponse(message)
    return NextResponse.json({ reply: fallbackReply })
  } catch (error) {
    console.error('Error in chat route:', error)
    return NextResponse.json({ reply: getAssistantResponse('help') })
  }
}
