'use client'

import { useEffect, useState } from 'react'
import Label from '@/components/tailAdmin/form/Label'
import Input from '@/components/tailAdmin/form/input/InputField'
import Badge from '@/components/tailAdmin/ui/badge/Badge'
import Button from '@/components/tailAdmin/ui/button/Button'
import { CloseLineIcon } from '@/icons'

interface MultiElementInputProps {
  title: string
  name: string
  items?: string[]
  placeholder?: string
  className?: string
  error?: boolean
  updateVacancyData?: (data: { nonNegotiables: string[] }) => void
}

function MultiElementInput({
  title,
  name,
  items = [],
  placeholder = 'Enter value',
  error = false,
  className = '',
  updateVacancyData = () => {},
}: MultiElementInputProps) {
  const [currentValue, setCurrentValue] = useState('')
  const [values, setValues] = useState<string[]>([])

  useEffect(() => {
    setValues(items)
  }, [items])

  const handleAddElement = () => {
    const trimmed = currentValue.trim()
    if (!trimmed || values.includes(trimmed)) return

    const updated = [...values, trimmed]
    setValues(updated)
    updateVacancyData({ nonNegotiables: updated })
    setCurrentValue('') // ← this will now work
  }

  const handleRemoveElement = (valueToRemove: string) => {
    const updated = values.filter((v) => v !== valueToRemove)
    setValues(updated)
    updateVacancyData({ nonNegotiables: updated })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddElement()
    }
  }

  return (
    <div className={className}>
      <Label htmlFor={name}>{title}</Label>
      <div className="mb-4 flex gap-x-2">
        <Input
          name={name}
          error={error}
          value={currentValue} // <-- controlled input
          onChange={(e) => setCurrentValue(e.target.value)}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="block w-full flex-1"
        />
        <Button
          onClick={handleAddElement}
          className="ml-2 inline"
          variant="plain"
          size="sm"
        >
          Add
        </Button>
      </div>

      {values.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {values.map((value) => (
            <Badge
              key={value}
              variant="solid"
              color="info"
              startIcon={
                <button
                  onClick={() => handleRemoveElement(value)}
                  type="button"
                  className="focus:outline-none"
                >
                  <CloseLineIcon className="h-3 w-3" />
                </button>
              }
            >
              {value}
            </Badge>
          ))}
        </div>
      )}
      <input type="hidden" name={name} value={JSON.stringify(values)} />
    </div>
  )
}

export default MultiElementInput
