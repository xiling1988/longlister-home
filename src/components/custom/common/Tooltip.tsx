'use client'

import { Info } from 'lucide-react'
import Link from 'next/link'
import { ReactNode, useEffect, useRef, useState } from 'react'

type TooltipProps = {
  icon: ReactNode
  children: ReactNode // rich tooltip content
}

export default function Tooltip({ icon, children }: TooltipProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isHovered) {
      setIsVisible(true)
    } else {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false)
      }, 150) // Match fade-out duration
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [isHovered])

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false)
    }, 200) // 200ms grace period
  }

  return (
    <div className="relative inline-block text-left align-middle">
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Info
          size={24}
          className="cursor-pointer text-brand-coral hover:text-brand-red"
        />
      </div>

      {isVisible && (
        <div
          className={`animate-fade-in absolute top-9 left-1/2 z-10 w-72 -translate-x-1/2 rounded-md bg-gray-900 px-3 py-2 text-sm text-white shadow-lg ${isHovered ? 'animate-fade-in' : 'animate-fade-out'}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Arrow */}
          <div className="absolute top-[-6px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-gray-900"></div>
          {children}
        </div>
      )}
    </div>
  )
}
