import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { AppRouterProvider } from './router'

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { type: 'module' }).then(
      (registration) => {
        console.log('ServiceWorker registration successful:', registration.scope)
      },
      (error) => {
        console.log('ServiceWorker registration failed:', error)
      }
    )
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouterProvider />
  </StrictMode>
)
