import React from 'react'
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function BarChart({ data, previousData }) {
  const chartData = (data || []).map((item, index) => ({
    name: item.name || `Item ${index + 1}`,
    current: item.value || 0,
    previous: previousData?.[index]?.value || 0
  }))

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '200px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar 
            dataKey="current" 
            fill="#007bff" 
            name="Current Period"
          />
          <Bar 
            dataKey="previous" 
            fill="#6c757d" 
            name="Previous Period"
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChart

