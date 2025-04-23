import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ToastProvider } from './context/ToastContext'
import App from './App.jsx'

// Create root once
const root = createRoot(document.getElementById('root'))

// Render the app
root.render(
  <React.StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>
)
