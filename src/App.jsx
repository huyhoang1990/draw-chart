import React, { useState } from 'react'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [dashboards, setDashboards] = useState([])
  const [activeDashboardId, setActiveDashboardId] = useState(null)

  const createDashboard = () => {
    const newDashboard = {
      id: Date.now().toString(),
      name: `Dashboard ${dashboards.length + 1}`,
      charts: [],
      layout: []
    }
    setDashboards([...dashboards, newDashboard])
    setActiveDashboardId(newDashboard.id)
  }

  const updateDashboard = (dashboardId, updates) => {
    setDashboards(dashboards.map(d => 
      d.id === dashboardId ? { ...d, ...updates } : d
    ))
  }

  const deleteDashboard = (dashboardId) => {
    const updated = dashboards.filter(d => d.id !== dashboardId)
    setDashboards(updated)
    if (activeDashboardId === dashboardId) {
      setActiveDashboardId(updated.length > 0 ? updated[0].id : null)
    }
  }

  const activeDashboard = dashboards.find(d => d.id === activeDashboardId)

  return (
    <div className="app">
      <div className="header">
        <h1>Dynamic Dashboard Builder</h1>
        <button className="btn btn-primary" onClick={createDashboard}>
          + Create Dashboard
        </button>
      </div>

      {dashboards.length > 0 && (
        <div className="dashboard-selector">
          <select 
            value={activeDashboardId || ''} 
            onChange={(e) => setActiveDashboardId(e.target.value)}
            className="form-select"
            style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
          >
            {dashboards.map(dashboard => (
              <option key={dashboard.id} value={dashboard.id}>
                {dashboard.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {activeDashboard ? (
        <Dashboard
          dashboard={activeDashboard}
          onUpdate={updateDashboard}
          onDelete={deleteDashboard}
        />
      ) : (
        <div className="empty-state">
          <div className="empty-dashboard">
            <div className="empty-dashboard-icon">📊</div>
            <div className="empty-dashboard-text">
              No dashboard selected. Create a new dashboard to get started!
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

