# React Dynamic Dashboard

A powerful, flexible dashboard builder built with React that allows users to create, customize, and manage dashboards with multiple chart types.

## Features

✅ **Create Multiple Dashboards** - Create and manage multiple dashboards
✅ **Drag & Drop Charts** - Intuitively drag and drop charts to rearrange your dashboard
✅ **Resizable Charts** - Resize charts to fit your visualization needs
✅ **Multiple Chart Types**:
   - **Number Chart** - Display key metrics with comparison to previous period
   - **Line Chart** - Visualize trends over time with current vs previous period
   - **Bar Chart** - Compare values side-by-side with previous period data
   - **Table Chart** - Detailed tabular view with change indicators
✅ **Period Comparison** - All charts support comparison with previous period data
✅ **Flexible Layout** - Create custom zones and layouts for your charts

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will start on `http://localhost:5173`

### Build

```bash
npm run build
```

## Usage

1. **Create a Dashboard**: Click the "Create Dashboard" button to create a new dashboard
2. **Add Charts**: Click "Add Chart" to add a new chart to your dashboard
3. **Configure Chart**:
   - Enter a chart title
   - Select chart type (Number, Line, Bar, or Table)
   - Set width and height in grid units
   - Enter current period data in JSON format
   - Enter previous period data for comparison
   - Use "Load Sample" to get example data
4. **Arrange Charts**: Drag charts to reposition them on the dashboard
5. **Resize Charts**: Use the resize handle on the bottom-right of each chart
6. **Edit/Delete**: Click the edit or delete icons on any chart

## Data Format

### Number Chart
```json
[{"value": 1250}]
```

### Line/Bar Chart
```json
[
  {"name": "Jan", "value": 400},
  {"name": "Feb", "value": 300},
  {"name": "Mar", "value": 500}
]
```

### Table Chart
```json
[
  {"category": "Product A", "value": 1200},
  {"category": "Product B", "value": 800}
]
```

## Technologies

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **react-grid-layout** - Drag and drop grid layout
- **recharts** - Chart visualization library

## Project Structure

```
src/
  ├── App.jsx                 # Main application component
  ├── components/
  │   ├── Dashboard.jsx       # Dashboard container with grid layout
  │   ├── Chart.jsx           # Chart wrapper component
  │   ├── ChartConfig.jsx     # Chart configuration modal
  │   └── ChartTypes/
  │       ├── NumberChart.jsx # Number/metric chart
  │       ├── LineChart.jsx   # Line chart
  │       ├── BarChart.jsx    # Bar chart
  │       └── TableChart.jsx  # Table chart
  └── index.jsx              # Application entry point
```

