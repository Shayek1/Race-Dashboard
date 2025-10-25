import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RaceMetrics from './RaceMetrics.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RaceMetrics />
  </StrictMode>,
)
