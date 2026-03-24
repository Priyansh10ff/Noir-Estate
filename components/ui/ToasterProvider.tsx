'use client'

import { Toaster } from 'react-hot-toast'

export default function ToasterProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: '#181818',
          color: '#F5F0E8',
          border: '1px solid rgba(201,169,110,0.3)',
          fontSize: '12px',
          letterSpacing: '0.5px',
          fontFamily: 'Montserrat, sans-serif',
        },
        success: { iconTheme: { primary: '#C9A96E', secondary: '#0A0A0A' } },
      }}
    />
  )
}
