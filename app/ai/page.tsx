'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { Bot, User, Sparkles, Send, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { COMPANY_INFO, getAssistantResponse } from '@/lib/ai-knowledge'

type Message = { id: string; role: 'user' | 'assistant'; content: string }

const SUGGESTED_QUESTIONS = [
  'Tell me about Gara Media',
  'What core services do you offer?',
  'Show me your client case studies',
  'What industries do you specialize in?',
  'Who is on the leadership team?',
  'How do I book a strategic consultation?',
]

function Bubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user'
  return (
    <div className={'flex gap-3 ' + (isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gold/20 text-gold mt-1 border border-gold/30">
          <Bot className="size-4" />
        </span>
      )}
      <div
        className={
          'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ' +
          (isUser
            ? 'bg-gold text-[#0b2545] font-semibold rounded-br-none shadow-md'
            : 'bg-white/10 text-white/95 rounded-bl-none border border-white/10')
        }
      >
        {msg.content}
      </div>
      {isUser && (
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gold/20 text-gold mt-1">
          <User className="size-4" />
        </span>
      )}
    </div>
  )
}

export default function AiAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        `Welcome to **Gara AI Assistant**!\n\nI am your interactive digital partner for ${COMPANY_INFO.name}. I can answer any questions about our services, case studies, industries, leadership, process, open career roles, and booking a consultation.\n\nHow can I help you today?`,
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  async function handleSendText(text: string) {
    const trimmed = text.trim()
    if (!trimmed || typing) return

    setMessages((p) => [...p, { id: 'u-' + Date.now(), role: 'user', content: trimmed }])
    setInput('')
    setTyping(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      })
      const data = await res.json()
      const replyText = data?.reply || getAssistantResponse(trimmed)
      setMessages((p) => [
        ...p,
        { id: 'a-' + Date.now(), role: 'assistant', content: replyText },
      ])
    } catch {
      const fallback = getAssistantResponse(trimmed)
      setMessages((p) => [
        ...p,
        { id: 'a-' + Date.now(), role: 'assistant', content: fallback },
      ])
    } finally {
      setTyping(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendText(input)
    }
  }

  return (
    <div
      id="gara-ai-assistant"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 pb-12 bg-[#081b33]"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/ai-bg.jpg"
          alt="AI Assistant Background"
          fill
          priority
          quality={100}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#081b33]/85 backdrop-blur-sm" />
      </div>

      <div className="w-full max-w-3xl mx-4 h-[82vh] bg-[#081b33] border border-white/15 rounded-2xl backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-white/10 px-6 py-4 bg-[#0b2545] shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-gold/20 text-gold border border-gold/30">
              <Sparkles className="size-5" />
            </span>
            <div>
              <h1 className="text-lg font-bold tracking-wide text-white font-heading">
                Gara AI Assistant
              </h1>
              <p className="text-xs text-white/60">
                Enterprise Knowledge & Strategic Intelligence
              </p>
            </div>
          </div>
          <Link
            href="/consultation"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-gold/15 border border-gold/40 px-3.5 py-1.5 text-xs font-semibold text-gold hover:bg-gold hover:text-[#0b2545] transition-all"
          >
            Book Consultation <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* Message Container */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-[#081b33]">
          {messages.map((msg) => (
            <Bubble key={msg.id} msg={msg} />
          ))}

          {typing && (
            <div className="flex gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gold/20 text-gold mt-1 border border-gold/30">
                <Bot className="size-4" />
              </span>
              <div className="rounded-2xl rounded-bl-none bg-white/10 px-5 py-3 border border-white/10">
                <div className="flex gap-1.5 items-center">
                  <span className="size-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="size-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="size-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}

          {messages.length < 4 && (
            <div className="pt-4">
              <p className="text-xs text-white/50 mb-3 uppercase tracking-wider font-semibold">
                Suggested Questions
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSendText(q)}
                    className="text-xs bg-white/5 hover:bg-white/15 border border-white/10 hover:border-gold/50 text-white/80 hover:text-white rounded-xl px-3.5 py-2 transition-all text-left cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={endRef} />
        </div>

        {/* Footer Input */}
        <div className="border-t border-white/10 px-6 py-4 bg-[#0b2545] shrink-0">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Gara AI Assistant anything about our services, projects, or team..."
              disabled={typing}
              className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold placeholder-white/40 disabled:opacity-50"
            />
            <button
              onClick={() => handleSendText(input)}
              disabled={typing || !input.trim()}
              className="bg-gold text-[#0b2545] font-semibold px-5 py-3 rounded-xl text-sm hover:bg-gold-soft transition-colors disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              <span>Send</span>
              <Send className="size-4" />
            </button>
          </div>
          <p className="mt-2 text-[0.7rem] text-white/50 text-center">
            Gara AI Assistant references real-time data across all Gara Digitals pages.
          </p>
        </div>
      </div>
    </div>
  )
}
