import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HocBook from './HocBook.jsx'

// No <ScrictMode> around following to avoid double render

createRoot(document.getElementById('root')).render(
  <>
    <HocBook />
  </>
)
