import React from 'react'

function NumberChart({ data, previousData }) {
  const currentValue = data?.[0]?.value || 0
  const previousValue = previousData?.[0]?.value || 0
  const difference = currentValue - previousValue
  const percentageChange = previousValue !== 0 
    ? ((difference / previousValue) * 100).toFixed(1)
    : 0

  const getComparisonClass = () => {
    if (difference > 0) return 'comparison-positive'
    if (difference < 0) return 'comparison-negative'
    return 'comparison-neutral'
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  return (
    <div className="number-chart">
      <div className="number-label">Current Value</div>
      <div className="number-value">{formatNumber(currentValue)}</div>
      <div style={{ marginTop: '10px' }}>
        <span className={`comparison-badge ${getComparisonClass()}`}>
          {difference > 0 ? '↑' : difference < 0 ? '↓' : '→'} {Math.abs(percentageChange)}%
        </span>
        <span style={{ fontSize: '12px', color: '#6c757d', marginLeft: '8px' }}>
          vs previous: {formatNumber(previousValue)}
        </span>
      </div>
    </div>
  )
}

export default NumberChart

