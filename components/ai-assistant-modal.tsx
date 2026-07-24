'use client'

import { useState, useRef, useEffect } from 'react'
import { Bot, User, X, Sparkles, Send, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useAiAssistant } from './ai-assistant-provider'
import { getAssistantResponse } from '@/lib/ai-knowledge'

type Message = { id: string; role: 'user' | 'assistant'; content: string }

const SUGGESTED_QUESTIONS = [
  'What services do you offer?',
  'Show me your case studies',
  'What industries do you serve?',
  'Who is on the leadership team?',
  'Are there any open roles?',
  'How do I book a consultation?',
]

export function AiAssistantModal() {
  const { isOpen, closeAssistant } = useAiAssistant()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Welcome to **Gara AI Assistant**!\n\nI can help you explore Gara Media's services, case studies, industries served, leadership team, careers, and book strategic consultations. What would you like to know?",
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, typing, isOpen])

  if (!isOpen) return null

  async function handleSendText(text: string) {
    const trimmed = text.trim()
    if (!trimmed || typing) return

    const userMsg: Message = { id: 'u-' + Date.now(), role: 'user', content: trimmed }
    setMessages((prev) => [...prev, userMsg])
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
      setMessages((prev) => [
        ...prev,
        { id: 'a-' + Date.now(), role: 'assistant', content: replyText },
      ])
    } catch {
      const fallback = getAssistantResponse(trimmed)
      setMessages((prev) => [
        ...prev,
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
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/75 backdrop-blur-md transition-opacity animate-in fade-in duration-300">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={closeAssistant} />

      {/* Drawer Card */}
      <div className="relative z-10 flex h-full w-full max-w-lg flex-col border-l border-white/15 bg-[#081b33] text-white shadow-2xl backdrop-blur-2xl sm:h-[92vh] sm:my-auto sm:mr-4 sm:rounded-2xl sm:border">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#0b2545] rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-gold/20 text-gold shadow-inner border border-gold/30">
              <Sparkles className="size-5" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-wide text-white font-heading">
                Gara AI Assistant
              </h2>
              <p className="text-xs text-white/60">
                Enterprise Digital Guide & Strategic Partner
              </p>
            </div>
          </div>
          <button
            onClick={closeAssistant}
            className="grid size-9 place-items-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Close Assistant"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-[#081b33]">
          {messages.map((msg) => {
            const isUser = msg.role === 'user'
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gold/20 text-gold mt-1 border border-gold/30">
                    <Bot className="size-4" />
                  </span>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                    isUser
                      ? 'bg-gold text-[#0b2545] font-semibold rounded-br-none shadow-md'
                      : 'bg-white/10 text-white/95 rounded-bl-none border border-white/10'
                  }`}
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
          })}

          {typing && (
            <div className="flex gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gold/20 text-gold mt-1">
                <Bot className="size-4" />
              </span>
              <div className="rounded-2xl rounded-bl-none bg-white/10 px-4 py-3 border border-white/10">
                <div className="flex gap-1.5 items-center">
                  <span className="size-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="size-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="size-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Suggestions */}
          {messages.length < 4 && (
            <div className="pt-3">
              <p className="text-[0.7rem] uppercase tracking-wider text-white/50 font-semibold mb-2.5">
                Suggested Questions
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSendText(q)}
                    className="text-xs bg-white/5 hover:bg-white/15 border border-white/10 hover:border-gold/50 text-white/80 hover:text-white rounded-xl px-3 py-2 text-left transition-all cursor-pointer"
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
        <div className="border-t border-white/10 px-5 py-4 bg-[#0b2545] rounded-b-2xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Gara AI Assistant..."
              disabled={typing}
              className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold placeholder-white/40 disabled:opacity-50"
            />
            <button
              onClick={() => handleSendText(input)}
              disabled={typing || !input.trim()}
              className="bg-gold text-[#0b2545] font-semibold px-4 py-2.5 rounded-xl text-sm hover:bg-gold-soft transition-colors disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="size-4" />
            </button>
          </div>
          <div className="mt-3 flex items-center justify-between text-[0.7rem] text-white/50">
            <span>Powered by Gara Digitals AI</span>
            <Link
              href="/consultation"
              onClick={closeAssistant}
              className="text-gold hover:underline flex items-center gap-1 font-medium"
            >
              Book Consultation <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
