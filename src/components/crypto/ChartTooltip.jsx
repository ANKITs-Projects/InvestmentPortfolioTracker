import React from 'react'

export const ChartTooltip = ({ active, payload }) => {
      // console.log(active)
  if (active && payload?.[0]?.payload) {
    const { time, price } = payload[0].payload
    return (
      <div className="p-2 bg-gray-800 text-white rounded shadow-lg">
        <p className="font-bold">{`Time: ${time}`}</p>
        <p className="text-green-400">{`Price: $${price.toFixed(2)}`}</p>
      </div>
    )
  }
  return null
}