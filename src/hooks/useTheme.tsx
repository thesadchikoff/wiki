import { ThemeContext } from '@/context/theme/ThemeProvider'
import { useContext } from 'react'

export const useTheme = () => useContext(ThemeContext)
