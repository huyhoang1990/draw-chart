import React from 'react'
import NumberChart from './ChartTypes/NumberChart'
import LineChart from './ChartTypes/LineChart'
import BarChart from './ChartTypes/BarChart'
import TableChart from './ChartTypes/TableChart'
import './Chart.css'

function Chart({ chart, onEdit, onDelete }) {
  const renderChart = () => {
    switch (chart.type) {
      case 'number':
        return <NumberChart data={chart.data} previousData={chart.previousData} />
      case 'line':
        return <LineChart data={chart.data} previousData={chart.previousData} />
      case 'bar':
        return <BarChart data={chart.data} previousData={chart.previousData} />
      case 'table':
        return <TableChart data={chart.data} previousData={chart.previousData} />
      default:
        return <div>Unknown chart type</div>
    }
  }

  return (
    <div className="chart-item">
      <div className="chart-header">
        <div className="chart-title">{chart.title || 'Untitled Chart'}</div>
        <div className="chart-actions">
          <button className="btn-icon" onClick={onEdit} title="Edit">
            ✏️
          </button>
          <button className="btn-icon" onClick={onDelete} title="Delete">
            🗑️
          </button>
        </div>
      </div>
      <div className="chart-content">
        {renderChart()}
      </div>
    </div>
  )
}

export default Chart

