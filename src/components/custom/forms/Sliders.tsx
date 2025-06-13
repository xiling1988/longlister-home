'use client'

import React, { useEffect, useState } from 'react'
import rawPriceData from '@/common/constants/fixed_price_data.json'
import { useNewVacancyContext } from '@/context/NewVacancyContext'

const priceData: Record<number, Record<number, number>> = Object.fromEntries(
  Object.entries(rawPriceData).map(([day, cvMap]) => [
    Number(day),
    Object.fromEntries(
      Object.entries(cvMap).map(([cv, price]) => [Number(cv), price]),
    ),
  ]),
)

const deadlineMarks = [7, 21]
const cvMarks = [1, 20]

export default function Sliders() {
  const { newVacancyData, updateVacancyData } = useNewVacancyContext()
  const [deadline, setDeadline] = useState(newVacancyData.deadline)
  const [cvCount, setCvCount] = useState(newVacancyData.maxCvs ?? 1)
  const [price, setPrice] = useState(newVacancyData.totalBudget)
  const [singlePrice, setSinglePrice] = useState(newVacancyData.cvPriceBudget)
  const [deadlineDate, setDeadlineDate] = useState(
    new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  )

  useEffect(() => {
    const deadlineInt = Number(deadline)
    const newPrice = priceData[deadlineInt]?.[cvCount] ?? 0

    setPrice(newPrice)
    setSinglePrice(newPrice / cvCount)
    setDeadlineDate(
      new Date(
        new Date().getTime() + deadlineInt * 24 * 60 * 60 * 1000,
      ).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    )
  }, [deadline, cvCount])

  useEffect(() => {
    updateVacancyData({
      maxCvs: cvCount,
      deadline: deadline,
      cvPriceBudget: singlePrice,
      totalBudget: price,
    })
  }, [price, singlePrice])

  return (
    <div
      id="sliders"
      className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]"
    >
      <div className="mb-6">
        <h2 className="mb-1 text-xl font-semibold text-gray-800 dark:text-white">
          Vacancy Budget Estimation: AED {price?.toFixed(2) ?? 'N/A'}
        </h2>
        <p className="text-sm text-gray-600 dark:text-white/70">
          Set your budget by choosing the number of CVs you want to receive and
          the deadline for the vacancy.
        </p>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Deadline Slider */}
        <div className="flex-1">
          <label className="mb-2 block font-medium text-gray-700 dark:text-white">
            Choose Deadline (days)
          </label>
          <input
            type="range"
            min={deadlineMarks[0]}
            max={deadlineMarks[1]}
            step={1}
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="custom-range w-full appearance-none bg-transparent focus:outline-none"
            style={
              {
                '--range-progress': `${(((typeof deadline === 'number' ? deadline : Number(deadline) || deadlineMarks[0]) - deadlineMarks[0]) / (deadlineMarks[1] - deadlineMarks[0])) * 100}%`,
              } as React.CSSProperties
            }
          />
          <div className="mt-2 text-sm text-gray-600 dark:text-white/70">
            {deadline} days
          </div>
        </div>

        {/* CV Count Slider */}
        <div className="flex-1">
          <label className="mb-2 block font-medium text-gray-700 dark:text-white">
            Choose Number of CVs
          </label>
          <input
            type="range"
            min={cvMarks[0]}
            max={cvMarks[1]}
            step={1}
            value={cvCount}
            onChange={(e) => setCvCount(Number(e.target.value))}
            className="custom-range w-full appearance-none bg-transparent focus:outline-none"
            style={
              {
                '--range-progress': `${((cvCount - cvMarks[0]) / (cvMarks[1] - cvMarks[0])) * 100}%`,
              } as React.CSSProperties
            }
          />
          <div className="mt-2 text-sm text-gray-600 dark:text-white/70">
            {cvCount} CVs
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between text-sm font-medium text-gray-700 dark:text-white">
        <span>{deadlineDate}</span>
        <span>Price per CV: AED {singlePrice?.toFixed(2) ?? 'N/A'}</span>
      </div>
    </div>
  )
}
