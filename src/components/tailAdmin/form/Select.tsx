import React, { useState } from 'react'

interface Option {
  value: string
  label: string
}

interface SelectProps {
  options: Option[]
  placeholder?: string
  onChange: (value: string) => void
  className?: string
  defaultValue?: string
  name?: string
  error?: boolean
  hint?: string
  required?: boolean
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = 'Select an option',
  onChange,
  name,
  className = '',
  defaultValue = '',
  error = false,
  hint = '',
  required = false,
}) => {
  // Manage the selected value
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectedValue(value)
    onChange(value) // Trigger parent handler
  }

  return (
    <>
      <select
        className={`h-11 w-full appearance-none rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${
          selectedValue
            ? 'text-gray-800 dark:text-white/90'
            : 'text-gray-400 dark:text-gray-400'
        } ${className}`}
        value={selectedValue}
        onChange={handleChange}
        name={name}
        required={required}
      >
        {/* Placeholder option */}
        <option
          value=""
          disabled
          className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
        >
          {placeholder}
        </option>
        {/* Map over options */}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {hint || 'This field is required'}
        </p>
      )}
      {!error && hint && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{hint}</p>
      )}
    </>
  )
}

export default Select
