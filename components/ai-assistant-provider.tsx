'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'

interface AiAssistantContextType {
  isOpen: boolean
  openAssistant: () => void
  closeAssistant: () => void
  toggleAssistant: () => void
}

const AiAssistantContext = createContext<AiAssistantContextType | undefined>(
  undefined
)

export function AiAssistantProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const openAssistant = useCallback(() => {
    if (pathname === '/ai') {
      const el = document.getElementById('gara-ai-assistant')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      setIsOpen(true)
    }
  }, [pathname])

  const closeAssistant = useCallback(() => {
    setIsOpen(false)
  }, [])

  const toggleAssistant = useCallback(() => {
    if (pathname === '/ai') {
      const el = document.getElementById('gara-ai-assistant')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      setIsOpen((prev) => !prev)
    }
  }, [pathname])

  return (
    <AiAssistantContext.Provider
      value={{ isOpen, openAssistant, closeAssistant, toggleAssistant }}
    >
      {children}
    </AiAssistantContext.Provider>
  )
}

export function useAiAssistant() {
  const context = useContext(AiAssistantContext)
  if (!context) {
    throw new Error('useAiAssistant must be used within an AiAssistantProvider')
  }
  return context
}
