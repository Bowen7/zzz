import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'jotai'
import { router } from './router.tsx'
import { Toaster } from '@/components/ui/toaster'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </StrictMode>,
)
