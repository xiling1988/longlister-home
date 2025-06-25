'use client'

import { googleCalendarUrl } from '@/common/constants'
import { useEffect } from 'react'

interface BookingModalProps {
  open: boolean
  onClose: () => void
}

export function BookingModal({ open, onClose }: BookingModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (open) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative mx-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        <button
          className="absolute top-4 right-6 text-2xl text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="mb-4 text-xl font-semibold">Book a Call</h2>
        <iframe
          src={googleCalendarUrl}
          width="100%"
          height="600"
          style={{ border: 'none' }}
          loading="lazy"
          allow="camera; microphone; fullscreen; display-capture"
        />
      </div>
    </div>
  )
}
