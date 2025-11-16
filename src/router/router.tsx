import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import * as pages from '../pages'
import { Routing } from './routing'

const router = createBrowserRouter(
  [
    {
      path: '/',
      errorElement: <Navigate to={Routing.NotFound.path} />,
      element: <pages.Page />,
    },

    {
      path: Routing.Camera.path,
      element: <pages.camera.Page />,
    },

    {
      path: Routing.NotFound.path,
      element: <pages.notFound.Page />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
)

export function AppRouterProvider() {
  return <RouterProvider router={router} />
}
