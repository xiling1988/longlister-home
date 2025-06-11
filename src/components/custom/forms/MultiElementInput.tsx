import { useState } from 'react'
import Label from '@/components/tailAdmin/form/Label'
import Input from '@/components/tailAdmin/form/input/InputField'
import Badge from '@/components/tailAdmin/ui/badge/Badge'
import Button from '@/components/tailAdmin/ui/button/Button'
import { CloseLineIcon } from '@/icons'

interface MultiElementInputProps {
  title: string
  name: string
  items?: string[] // Optional items to pre-populate the input
  placeholder?: string
  className?: string
}

function MultiElementInput({
  title,
  name,
  items,
  placeholder = 'Enter value',
  className = '',
}: MultiElementInputProps) {
  const [currentValue, setCurrentValue] = useState('')
  const [values, setValues] = useState<string[]>(items || [])

  const handleAddElement = () => {
    const trimmed = currentValue.trim()
    if (!trimmed || values.includes(trimmed)) return

    setValues([...values, trimmed])
    setCurrentValue('')
  }

  const handleRemoveElement = (valueToRemove: string) => {
    setValues((prev) => prev.filter((v) => v !== valueToRemove))
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
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          placeholder={placeholder}
          required
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
    </div>
  )
}

export default MultiElementInput

// import Label from '@/components/tailAdmin/form/Label'
// import Input from '@/components/tailAdmin/form/input/InputField'
// import Badge from '@/components/tailAdmin/ui/badge/Badge'
// import Button from '@/components/tailAdmin/ui/button/Button'
// import { CloseLineIcon } from '@/icons'
// import { useState } from 'react'

// interface MultiElementInputProps {
//   title: string
//   name: string
//   type?: string
//   placeholder?: string
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
//   className?: string
// }

// function MultiElementInput({
//   title,
//   name,
//   type = 'text',
//   placeholder = 'Enter value',
//   onChange,
//   className = '',
// }: MultiElementInputProps) {
//   const [currentValue, setCurrentValue] = useState<string>('')
//   const [values, setValues] = useState<string[]>([])

//   // Handle adding a new non-negotiable item
//   const handleAddElement = () => {
//     if (!currentValue.trim()) return

//     // Add the current value to the list of values
//     setValues((prevValues) => [...prevValues, currentValue.trim()])
//     setCurrentValue('') // Clear the input field
//   }

//   return (
//     <div>
//       <Label>{title}</Label>
//       <div className="grid w-full grid-cols-6 items-center justify-between gap-2">
//         <Input
//           name={name}
//           onChange={(e) => {
//             if (e.target) {
//               setCurrentValue(e.target.value)
//             }
//           }}
//           type="text"
//           defaultValue={currentValue}
//           placeholder={placeholder}
//           required
//           className="col-span-5 mb-4 block w-80"
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') {
//               e.preventDefault() // 🔥 Prevents form submission
//               handleAddElement() // ✅ Adds skill instead
//             }
//           }}
//         />
//         <Button
//           onClick={handleAddElement}
//           className="col-span-1 mb-4 w-full"
//           variant="outline"
//           size="sm"
//         >
//           Add
//         </Button>
//       </div>
//       <div>
//         {values.map((value, index) => (
//           <Badge variant="solid" color="info" startIcon={<CloseLineIcon />}>
//             {value}
//           </Badge>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default MultiElementInput
