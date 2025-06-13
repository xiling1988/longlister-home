'use client'

'use client'

import Input from '@/components/tailAdmin/form/input/InputField'
import Label from '@/components/tailAdmin/form/Label'
import Button from '@/components/tailAdmin/ui/button/Button'
import { Trash2Icon, PlusIcon } from 'lucide-react'
import { useState } from 'react'

export interface NotifyParty {
  name: string
  email: string
}

export interface NotificationRecipientsProps {
  parties?: NotifyParty[]
  name?: string
  onChange: (parties: NotifyParty[]) => void
}

export default function NotificationRecipients({
  parties = [],
  onChange,
}: NotificationRecipientsProps) {
  const [currentParty, setCurrentParty] = useState<NotifyParty>({
    name: '',
    email: '',
  })
  const [notifyParties, setNotifyParties] = useState<NotifyParty[]>(parties)

  const handleAddParty = () => {
    if (!currentParty.name.trim() || !currentParty.email.trim()) return

    const updatedList = [...notifyParties, currentParty]
    setNotifyParties(updatedList)
    setCurrentParty({ name: '', email: '' })

    onChange(updatedList)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddParty()
    }
  }

  const handleRemoveParty = (index: number) => {
    const updatedList = notifyParties.filter((_, i) => i !== index)
    setNotifyParties(updatedList)
    onChange(updatedList)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-5">
          <Label>Name</Label>
          <Input
            value={currentParty.name}
            onChange={(e) =>
              setCurrentParty({ ...currentParty, name: e.target.value })
            }
            placeholder="Jane Doe"
          />
        </div>

        <div className="col-span-5">
          <Label>Email</Label>
          <Input
            type="email"
            value={currentParty.email}
            onChange={(e) =>
              setCurrentParty({ ...currentParty, email: e.target.value })
            }
            placeholder="jane@example.com"
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="col-span-2 flex items-end">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleAddParty}
            startIcon={<PlusIcon className="h-4 w-4" />}
          >
            Add
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {notifyParties.map((person, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-2 shadow-sm dark:border-gray-700 dark:bg-gray-900"
          >
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {person.name} – {person.email}
            </p>

            <Trash2Icon
              className="h-4 w-4 cursor-pointer text-red-500"
              onClick={() => handleRemoveParty(index)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
