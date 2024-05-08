import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { ThemeProvider } from './context/theme/ThemeProvider.tsx'
import './index.scss'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<ThemeProvider defaultTheme='system' storageKey='wiki-ui-theme'>
			<App />
		</ThemeProvider>
	</QueryClientProvider>
)
