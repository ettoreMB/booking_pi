'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import FilterProvider from './home/provider/filterProvier'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import AuthProvider from './home/provider/authProvider'
import ProductProvider from './home/provider/productProvier'

export function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthProvider>
          <FilterProvider>
            <ProductProvider>{children}</ProductProvider>
          </FilterProvider>
        </AuthProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  )
}
