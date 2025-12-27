import React, { useState, useRef, useEffect } from 'react'
import GridLayout from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import Chart from './Chart'
import ChartConfig from './ChartConfig'
import './Dashboard.css'

function Dashboard({ dashboard, onUpdate, onDelete }) {
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [editingChart, setEditingChart] = useState(null)
  const [containerWidth, setContainerWidth] = useState(1200)
  const containerRef = useRef(null)
  
  // Grid cell size - matches background grid
  const GRID_CELL_SIZE = 50
  const GRID_COLS = 12

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        // Align container width to ensure columns align with background grid
        // Each column should be a multiple of GRID_CELL_SIZE
        // Column width = containerWidth / GRID_COLS, so we want containerWidth to be multiple of GRID_CELL_SIZE * GRID_COLS
        const columnWidth = width / GRID_COLS
        const cellsPerColumn = Math.floor(columnWidth / GRID_CELL_SIZE)
        const alignedColumnWidth = cellsPerColumn * GRID_CELL_SIZE
        const alignedWidth = alignedColumnWidth * GRID_COLS
        setContainerWidth(alignedWidth || width)
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const addChart = () => {
    setEditingChart(null)
    setShowConfigModal(true)
  }

  const saveChart = (chartConfig) => {
    const chartId = editingChart?.id || Date.now().toString()
    
    let x = 0
    let y = 0
    
    if (editingChart) {
      x = editingChart.x ?? 0
      y = editingChart.y ?? 0
    } else {
      // Find next available position
      const existingLayout = dashboard.layout || []
      if (existingLayout.length > 0) {
        const maxY = Math.max(...existingLayout.map(l => l.y + l.h))
        const lastRowItems = existingLayout.filter(l => l.y + l.h === maxY)
        const maxX = Math.max(...lastRowItems.map(l => l.x + l.w))
        
        if (maxX + chartConfig.w <= GRID_COLS) {
          x = maxX
          y = maxY - chartConfig.h
        } else {
          x = 0
          y = maxY
        }
      }
    }

    const newChart = {
      id: chartId,
      ...chartConfig,
      x,
      y,
      w: chartConfig.w,
      h: chartConfig.h
    }

    let updatedCharts = [...dashboard.charts]
    let updatedLayout = [...dashboard.layout]

    if (editingChart) {
      updatedCharts = updatedCharts.map(c => 
        c.id === editingChart.id ? newChart : c
      )
      updatedLayout = updatedLayout.map(l => 
        l.i === editingChart.id 
          ? { ...l, x: newChart.x, y: newChart.y, w: newChart.w, h: newChart.h }
          : l
      )
    } else {
      updatedCharts.push(newChart)
      updatedLayout.push({
        i: newChart.id,
        x: newChart.x,
        y: newChart.y,
        w: newChart.w,
        h: newChart.h
      })
    }

    onUpdate(dashboard.id, {
      charts: updatedCharts,
      layout: updatedLayout
    })

    setShowConfigModal(false)
    setEditingChart(null)
  }

  const deleteChart = (chartId) => {
    onUpdate(dashboard.id, {
      charts: dashboard.charts.filter(c => c.id !== chartId),
      layout: dashboard.layout.filter(l => l.i !== chartId)
    })
  }

  const editChart = (chart) => {
    setEditingChart(chart)
    setShowConfigModal(true)
  }

  const onLayoutChange = (layout) => {
    onUpdate(dashboard.id, { layout })
  }

  return (
    <div className="dashboard-container" ref={containerRef}>
      <div className="dashboard-grid-background"></div>
      <div className="dashboard-header">
        <div className="dashboard-title">{dashboard.name}</div>
        <div>
          <button className="btn btn-primary" onClick={addChart}>
            + Add Chart
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => onDelete(dashboard.id)}
            style={{ marginLeft: '10px' }}
          >
            Delete Dashboard
          </button>
        </div>
      </div>

      {dashboard.charts.length === 0 ? (
        <div className="empty-dashboard">
          <div className="empty-dashboard-icon">📈</div>
          <div className="empty-dashboard-text">
            No charts yet. Click "Add Chart" to create your first visualization!
          </div>
        </div>
      ) : (
        <GridLayout
          className="layout"
          layout={dashboard.layout}
          cols={GRID_COLS}
          rowHeight={GRID_CELL_SIZE}
          width={containerWidth}
          onLayoutChange={onLayoutChange}
          isDraggable={true}
          isResizable={true}
          compactType={null}
          preventCollision={false}
        >
          {dashboard.charts.map(chart => (
            <div key={chart.id}>
              <Chart
                chart={chart}
                onEdit={() => editChart(chart)}
                onDelete={() => deleteChart(chart.id)}
              />
            </div>
          ))}
        </GridLayout>
      )}

      {showConfigModal && (
        <ChartConfig
          chart={editingChart}
          onSave={saveChart}
          onClose={() => {
            setShowConfigModal(false)
            setEditingChart(null)
          }}
        />
      )}
    </div>
  )
}

export default Dashboard

