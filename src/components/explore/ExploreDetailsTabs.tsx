import React, { useState } from 'react'

interface ChartTabProps {
  selectedTab: 'optionOne' | 'optionTwo' | 'optionThree' | 'optionFour'
  setSelectedTab: React.Dispatch<
    React.SetStateAction<
      'optionOne' | 'optionTwo' | 'optionThree' | 'optionFour'
    >
  >
}

function ExploreDetailsTabs({ selectedTab, setSelectedTab }: ChartTabProps) {
  // State to manage the selected tab

  const getButtonClass = (
    option: 'optionOne' | 'optionTwo' | 'optionThree' | 'optionFour',
  ) =>
    selectedTab === option
      ? 'shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800'
      : 'text-gray-500 dark:text-gray-400'

  return (
    <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
      <button
        onClick={() => setSelectedTab('optionOne')}
        className={`w-full rounded-md px-3 py-2 text-theme-sm font-medium hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          'optionOne',
        )}`}
      >
        Job Description
      </button>

      <button
        onClick={() => setSelectedTab('optionTwo')}
        className={`w-full rounded-md px-3 py-2 text-theme-sm font-medium hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          'optionTwo',
        )}`}
      >
        Company Profile
      </button>

      <button
        onClick={() => setSelectedTab('optionThree')}
        className={`w-full rounded-md px-3 py-2 text-theme-sm font-medium hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          'optionThree',
        )}`}
      >
        Package Details
      </button>

      <button
        onClick={() => setSelectedTab('optionFour')}
        className={`w-full rounded-md px-3 py-2 text-theme-sm font-medium hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          'optionFour',
        )}`}
      >
        Recruitment Process
      </button>
    </div>
  )
}

export default ExploreDetailsTabs
