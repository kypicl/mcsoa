import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from '@payloadcms/ui'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>{children}</HeaderThemeProvider>
    </ThemeProvider>
  )
}
