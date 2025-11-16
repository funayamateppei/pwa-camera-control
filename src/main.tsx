import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { AppRouterProvider } from './router'

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swPath = `${import.meta.env.BASE_URL}sw.js`
    navigator.serviceWorker.register(swPath, { type: 'module' }).then(
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
