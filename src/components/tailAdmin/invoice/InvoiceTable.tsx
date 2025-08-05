export default function InvoiceTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-800">
      <table className="min-w-full text-left text-gray-700 dark:text-gray-400">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr className="border-b border-gray-100 dark:border-gray-800">
            <th className="px-5 py-3 text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
              S.No.#
            </th>
            <th className="px-5 py-3 text-xs font-medium whitespace-nowrap text-gray-500 dark:text-gray-400">
              Products
            </th>
            <th className="px-5 py-3 text-center text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
              Quantity
            </th>
            <th className="px-5 py-3 text-center text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
              Unit Cost
            </th>
            <th className="px-5 py-3 text-center text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
              Discount
            </th>
            <th className="px-5 py-3 text-right text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
              Total
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          <tr>
            <td className="px-5 py-3 text-sm text-gray-500 dark:text-gray-400">
              1
            </td>
            <td className="px-5 py-3 text-sm font-medium text-gray-800 dark:text-white/90">
              Macbook pro 13”
            </td>
            <td className="px-5 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
              1
            </td>
            <td className="px-5 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
              $48
            </td>
            <td className="px-5 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
              0%
            </td>
            <td className="px-5 py-3 text-right text-sm text-gray-500 dark:text-gray-400">
              $1,200
            </td>
          </tr>
          <tr>
            <td className="px-5 py-3 text-sm text-gray-500 dark:text-gray-400">
              2
            </td>
            <td className="px-5 py-3 text-sm font-medium text-gray-800 dark:text-white/90">
              Apple Watch Ultra
            </td>
            <td className="px-5 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
              1
            </td>
            <td className="px-5 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
              $300
            </td>
            <td className="px-5 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
              50%
            </td>
            <td className="px-5 py-3 text-right text-sm text-gray-500 dark:text-gray-400">
              $150
            </td>
          </tr>
          <tr>
            <td className="px-5 py-3 text-sm text-gray-500 dark:text-gray-400">
              3
            </td>
            <td className="px-5 py-3 text-sm font-medium text-gray-800 dark:text-white/90">
              iPhone 15 Pro Max
            </td>
            <td className="px-5 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
              3
            </td>
            <td className="px-5 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
              $800
            </td>
            <td className="px-5 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
              0%
            </td>
            <td className="px-5 py-3 text-right text-sm text-gray-500 dark:text-gray-400">
              $1,600
            </td>
          </tr>
          <tr>
            <td className="px-5 py-3 text-sm text-gray-500 dark:text-gray-400">
              4
            </td>
            <td className="px-5 py-3 text-sm font-medium text-gray-800 dark:text-white/90">
              iPad Pro 3rd Gen
            </td>
            <td className="px-5 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
              1
            </td>
            <td className="px-5 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
              $900
            </td>
            <td className="px-5 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
              0%
            </td>
            <td className="px-5 py-3 text-right text-sm text-gray-500 dark:text-gray-400">
              $900
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
