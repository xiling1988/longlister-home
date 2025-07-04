import React, { useState } from 'react'



function ChartTab() {
  const [selected, setSelected] = useState<
    'optionOne' | 'optionTwo' | 'optionThree' | 'optionFour'
  >('optionOne')

  const getButtonClass = (
    option: 'optionOne' | 'optionTwo' | 'optionThree' | 'optionFour',
  ) =>
    selected === option
      ? 'shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800'
      : 'text-gray-500 dark:text-gray-400'

  return (
    <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
      <button
        onClick={() => setSelected('optionOne')}
        className={`w-full rounded-md px-3 py-2 text-theme-sm font-medium hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          'optionOne',
        )}`}
      >
        Job Description
      </button>

      <button
        onClick={() => setSelected('optionTwo')}
        className={`w-full rounded-md px-3 py-2 text-theme-sm font-medium hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          'optionTwo',
        )}`}
      >
        Company Profile
      </button>

      <button
        onClick={() => setSelected('optionThree')}
        className={`w-full rounded-md px-3 py-2 text-theme-sm font-medium hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          'optionThree',
        )}`}
      >
        Package Details
      </button>

      <button
        onClick={() => setSelected('optionFour')}
        className={`w-full rounded-md px-3 py-2 text-theme-sm font-medium hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          'optionFour',
        )}`}
      >
        Recruitment Process
      </button>
    </div>
  )
}

export default ChartTab
