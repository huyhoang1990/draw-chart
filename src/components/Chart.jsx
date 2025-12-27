import React, { useState } from 'react'
import NumberChart from './ChartTypes/NumberChart'
import LineChart from './ChartTypes/LineChart'
import BarChart from './ChartTypes/BarChart'
import TableChart from './ChartTypes/TableChart'
import './Chart.css'

function Chart({ chart, onEdit, onDelete }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDeleteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowDeleteConfirm(true)
  }

  const handleConfirmDelete = (e) => {
    e.stopPropagation()
    onDelete()
    setShowDeleteConfirm(false)
  }

  const handleCancelDelete = (e) => {
    e.stopPropagation()
    setShowDeleteConfirm(false)
  }

  const handleEditClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onEdit()
  }

  const handleButtonMouseDown = (e) => {
    // Stop the drag from starting when clicking buttons
    // This prevents react-grid-layout from detecting the mousedown
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

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
    <>
      <div className="chart-item">
        <div className="chart-header">
          <div className="chart-title">{chart.title || 'Untitled Chart'}</div>
          <div className="chart-actions">
            <button 
              className="btn-icon btn-edit" 
              onClick={handleEditClick}
              onMouseDown={handleButtonMouseDown}
              onMouseUp={(e) => e.stopPropagation()}
              title="Edit Chart"
            >
              ✏️
            </button>
            <button 
              className="btn-icon btn-delete" 
              onClick={handleDeleteClick}
              onMouseDown={handleButtonMouseDown}
              onMouseUp={(e) => e.stopPropagation()}
              title="Delete Chart"
            >
              🗑️
            </button>
          </div>
        </div>
        <div className="chart-content">
          {renderChart()}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="delete-confirm-overlay" onClick={handleCancelDelete}>
          <div className="delete-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="delete-confirm-title">Delete Chart?</div>
            <div className="delete-confirm-message">
              Are you sure you want to delete "{chart.title || 'Untitled Chart'}"? 
              This action cannot be undone.
            </div>
            <div className="delete-confirm-actions">
              <button 
                className="btn btn-secondary" 
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger" 
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Chart

