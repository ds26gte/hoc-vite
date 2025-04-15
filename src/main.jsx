import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HocBook from './HocBook.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HocBook />
  </StrictMode>,
)
