import React from 'react'

function ChartLegend({ legends }) {
  return (
    <div className="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400">
      {legends.map((legend) => (
        <div className="flex items-center" key={legend.title}>
          <span style={{ backgroundColor: `${legend.color}` }} className={`inline-block w-3 h-3 mr-1 rounded-full`}></span>
          <span>{legend.title}</span>
        </div>
      ))
      }
    </div >
  )
}

export default ChartLegend
