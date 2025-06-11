'use client'

'use client'

import Input from '@/components/tailAdmin/form/input/InputField'
import Label from '@/components/tailAdmin/form/Label'
import Button from '@/components/tailAdmin/ui/button/Button'
import { Trash2Icon, PlusIcon } from 'lucide-react'
import { useState } from 'react'

interface NotifyParty {
  name: string
  email: string
}

interface NotificationRecipientsProps {
  onChange?: (parties: NotifyParty[]) => void
}

export default function NotificationRecipients({
  onChange,
}: NotificationRecipientsProps) {
  const [party, setParty] = useState<NotifyParty>({ name: '', email: '' })
  const [notifyParties, setNotifyParties] = useState<NotifyParty[]>([])

  const handleAddParty = () => {
    if (!party.name.trim() || !party.email.trim()) return

    const updatedList = [...notifyParties, party]
    setNotifyParties(updatedList)
    setParty({ name: '', email: '' })

    onChange?.(updatedList)
  }

  const handleRemoveParty = (index: number) => {
    const updatedList = notifyParties.filter((_, i) => i !== index)
    setNotifyParties(updatedList)
    onChange?.(updatedList)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-5">
          <Label>Name</Label>
          <Input
            value={party.name}
            onChange={(e) => setParty({ ...party, name: e.target.value })}
            placeholder="Jane Doe"
          />
        </div>

        <div className="col-span-5">
          <Label>Email</Label>
          <Input
            type="email"
            value={party.email}
            onChange={(e) => setParty({ ...party, email: e.target.value })}
            placeholder="jane@example.com"
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
