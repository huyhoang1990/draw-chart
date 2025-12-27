import React from 'react'

function TableChart({ data, previousData }) {
  const tableData = (data || []).map((item, index) => {
    const currentValue = item.value || 0
    const previousValue = previousData?.[index]?.value || 0
    const difference = currentValue - previousValue
    const percentageChange = previousValue !== 0 
      ? ((difference / previousValue) * 100).toFixed(1)
      : 0

    return {
      category: item.category || item.name || `Item ${index + 1}`,
      current: currentValue,
      previous: previousValue,
      difference,
      percentageChange
    }
  })

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const getComparisonClass = (diff) => {
    if (diff > 0) return 'comparison-positive'
    if (diff < 0) return 'comparison-negative'
    return 'comparison-neutral'
  }

  return (
    <div className="table-chart">
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Current</th>
            <th>Previous</th>
            <th>Change</th>
            <th>% Change</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.category}</td>
              <td>{formatNumber(row.current)}</td>
              <td>{formatNumber(row.previous)}</td>
              <td>
                <span className={`comparison-badge ${getComparisonClass(row.difference)}`}>
                  {row.difference > 0 ? '+' : ''}{formatNumber(row.difference)}
                </span>
              </td>
              <td>
                <span className={`comparison-badge ${getComparisonClass(row.difference)}`}>
                  {row.percentageChange > 0 ? '+' : ''}{row.percentageChange}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableChart

