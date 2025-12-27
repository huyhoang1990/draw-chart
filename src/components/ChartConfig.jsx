import React, { useState, useEffect } from 'react'
import './ChartConfig.css'

function ChartConfig({ chart, onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'number',
    w: 4,
    h: 3,
    data: '',
    previousData: ''
  })

  useEffect(() => {
    if (chart) {
      setFormData({
        title: chart.title || '',
        type: chart.type || 'number',
        w: chart.w || 4,
        h: chart.h || 3,
        data: JSON.stringify(chart.data || [], null, 2),
        previousData: JSON.stringify(chart.previousData || [], null, 2)
      })
    }
  }, [chart])

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      const config = {
        title: formData.title,
        type: formData.type,
        w: parseInt(formData.w),
        h: parseInt(formData.h),
        data: JSON.parse(formData.data || '[]'),
        previousData: JSON.parse(formData.previousData || '[]')
      }
      onSave(config)
    } catch (error) {
      alert('Invalid JSON data. Please check your data format.')
    }
  }

  const getSampleData = (type) => {
    switch (type) {
      case 'number':
        return JSON.stringify([{ value: 1250 }], null, 2)
      case 'line':
      case 'bar':
        return JSON.stringify([
          { name: 'Jan', value: 400 },
          { name: 'Feb', value: 300 },
          { name: 'Mar', value: 500 },
          { name: 'Apr', value: 450 }
        ], null, 2)
      case 'table':
        return JSON.stringify([
          { category: 'Product A', value: 1200 },
          { category: 'Product B', value: 800 },
          { category: 'Product C', value: 1500 }
        ], null, 2)
      default:
        return '[]'
    }
  }

  const loadSampleData = () => {
    setFormData({
      ...formData,
      data: getSampleData(formData.type),
      previousData: getSampleData(formData.type)
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            {chart ? 'Edit Chart' : 'Add New Chart'}
          </div>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Chart Title</label>
            <input
              type="text"
              className="form-input"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter chart title"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Chart Type</label>
            <select
              className="form-select"
              value={formData.type}
              onChange={(e) => {
                setFormData({ ...formData, type: e.target.value })
              }}
            >
              <option value="number">Number</option>
              <option value="line">Line Chart</option>
              <option value="bar">Bar Chart</option>
              <option value="table">Table</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Width (grid units)</label>
              <input
                type="number"
                className="form-input"
                value={formData.w}
                onChange={(e) => setFormData({ ...formData, w: e.target.value })}
                min="1"
                max="12"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Height (grid units)</label>
              <input
                type="number"
                className="form-input"
                value={formData.h}
                onChange={(e) => setFormData({ ...formData, h: e.target.value })}
                min="1"
                max="10"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Current Data (JSON)
              <button
                type="button"
                onClick={loadSampleData}
                className="btn btn-secondary"
                style={{ marginLeft: '10px', padding: '5px 10px', fontSize: '12px' }}
              >
                Load Sample
              </button>
            </label>
            <textarea
              className="form-input"
              value={formData.data}
              onChange={(e) => setFormData({ ...formData, data: e.target.value })}
              rows="6"
              placeholder='[{"name": "Jan", "value": 400}, ...]'
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Previous Period Data (JSON)</label>
            <textarea
              className="form-input"
              value={formData.previousData}
              onChange={(e) => setFormData({ ...formData, previousData: e.target.value })}
              rows="6"
              placeholder='[{"name": "Jan", "value": 350}, ...]'
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {chart ? 'Update Chart' : 'Add Chart'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChartConfig

