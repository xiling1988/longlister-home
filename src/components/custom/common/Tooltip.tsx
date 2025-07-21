'use client'

import { Info } from 'lucide-react'
import Link from 'next/link'
import { ReactNode, useEffect, useRef, useState } from 'react'

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

type TooltipProps = {
  icon: ReactNode
  children: ReactNode
  position?: TooltipPosition
}

export default function Tooltip({
  icon,
  children,
  position = 'bottom',
}: TooltipProps) {
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

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-7 left-1/2 -translate-x-1/2'
      case 'left':
        return 'right-7 top-1/2 -translate-y-1/2'
      case 'right':
        return 'left-7 top-1/2 -translate-y-1/2'
      case 'bottom':
      default:
        return 'top-7 left-1/2 -translate-x-1/2'
    }
  }

  const getArrowClasses = () => {
    switch (position) {
      case 'top':
        return 'absolute bottom-[-6px] left-1/2 -translate-x-1/2 rotate-45'
      case 'left':
        return 'absolute right-[-6px] top-1/2 -translate-y-1/2 rotate-45'
      case 'right':
        return 'absolute left-[-6px] top-1/2 -translate-y-1/2 rotate-45'
      case 'bottom':
      default:
        return 'absolute top-[-6px] left-1/2 -translate-x-1/2 rotate-45'
    }
  }

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
          className={`absolute z-10 w-72 rounded-md bg-gray-900 px-3 py-2 text-sm text-white shadow-lg ${getPositionClasses()} ${isHovered ? 'animate-fade-in' : 'animate-fade-out'}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Arrow */}
          <div className={`h-3 w-3 bg-gray-900 ${getArrowClasses()}`} />
          {children}
        </div>
      )}
    </div>
  )
}
