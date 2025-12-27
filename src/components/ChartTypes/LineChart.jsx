import React from 'react'
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function LineChart({ data, previousData }) {
  const chartData = (data || []).map((item, index) => ({
    name: item.name || `Point ${index + 1}`,
    current: item.value || 0,
    previous: previousData?.[index]?.value || 0
  }))

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '200px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="current" 
            stroke="#007bff" 
            strokeWidth={2}
            name="Current Period"
          />
          <Line 
            type="monotone" 
            dataKey="previous" 
            stroke="#6c757d" 
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Previous Period"
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LineChart

