import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import * as pages from '../pages'
import { Routing } from './routing'

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <pages.NotFoundPage />,
    element: <pages.Page />,
  },

  {
    path: Routing.Camera.path,
    element: <pages.camera.Page />,
  },
])

export function AppRouterProvider() {
  return <RouterProvider router={router} />
}
