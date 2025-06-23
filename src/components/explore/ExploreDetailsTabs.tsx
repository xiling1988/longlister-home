import React, { useState } from 'react'

interface ChartTabProps {
  selectedTab: 'optionOne' | 'optionTwo' | 'optionThree' | 'optionFour'
  setSelectedTab: (
    tab: 'optionOne' | 'optionTwo' | 'optionThree' | 'optionFour',
  ) => void
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
    <div className="sticky top-0 z-10 mb-6 border-b border-gray-200 bg-white px-6 pt-6 pb-1 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-4 flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 shadow-sm dark:bg-gray-900">
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
    </div>
  )
}

export default ExploreDetailsTabs
