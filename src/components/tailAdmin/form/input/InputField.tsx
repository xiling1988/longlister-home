import React, { FC } from 'react'

interface InputProps {
  type?: 'text' | 'number' | 'email' | 'password' | 'date' | 'time' | string
  id?: string
  name?: string
  placeholder?: string
  defaultValue?: string | number
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  min?: string
  max?: string
  step?: number
  disabled?: boolean
  required?: boolean
  success?: boolean
  error?: boolean
  hint?: string
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  autoComplete?: string
  pattern?: string
  minLength?: number
  maxLength?: number
}

const Input: FC<InputProps> = ({
  type = 'text',
  id,
  name,
  placeholder,
  defaultValue,
  value,
  onChange,
  className = '',
  autoComplete,
  pattern = '',
  min = '',
  max = '',
  minLength,
  maxLength,
  step,
  disabled = false,
  success = false,
  error = false,
  hint,
  required = false,
  onKeyDown,
}) => {
  let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${className}`

  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`
  } else if (error) {
    inputClasses += ` text-error-800 border-error-500 focus:ring-3 focus:ring-error-500/10  dark:text-error-400 dark:border-error-500`
  } else if (success) {
    inputClasses += ` text-success-500 border-success-400 focus:ring-success-500/10 focus:border-success-300  dark:text-success-400 dark:border-success-500`
  } else {
    inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`
  }

  return (
    <div className="relative">
      <input
        autoComplete={autoComplete}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        {...(pattern ? { pattern } : {})}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        required={required}
        min={min}
        max={max}
        minLength={minLength}
        maxLength={maxLength}
        step={step}
        disabled={disabled}
        className={inputClasses}
        onKeyDown={onKeyDown}
      />

      {hint && (
        <p
          className={`mt-1.5 text-xs ${
            error
              ? 'text-error-500'
              : success
                ? 'text-success-500'
                : 'text-gray-500'
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  )
}

export default Input
