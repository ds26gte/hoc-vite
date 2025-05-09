// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { addToEditor, HocBook } from './HocBook.jsx'

// No <StrictMode> around following to avoid double render

window.addToEditor = addToEditor

createRoot(document.getElementById('root')).render(
  <>
    <HocBook />
  </>
)
