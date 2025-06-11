import React, { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode // Button text or content
  size?: 'sm' | 'md' // Button size
  variant?: 'primary' | 'outline' | 'plain' // Button variant
  startIcon?: ReactNode // Icon before the text
  endIcon?: ReactNode // Icon after the text
  onClick?: () => void // Click handler
  disabled?: boolean // Disabled state
  className?: string // Disabled state
  type?: 'button' | 'submit' | 'reset' // Button type
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = 'sm',
  variant = 'primary',
  startIcon,
  endIcon,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
}) => {
  // Size Classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-3.5 text-sm',
  }

  // Variant Classes
  const variantClasses = {
    primary:
      'bg-brand-red text-white shadow-theme-xs hover:bg-brand-coral disabled:bg-brand-300',
    outline:
      'bg-white text-brand-red ring-1 ring-inset ring-brand-coral hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300',
    plain: 'text-brand-red text-sm hover:underline dark:text-gray-400',
  }

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition ${className} ${
        variant === 'plain' ? '' : sizeClasses[size]
      } ${variantClasses[variant]} ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  )
}

export default Button
