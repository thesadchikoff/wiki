import { Worker } from '@react-pdf-viewer/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './context/theme/ThemeProvider.tsx'
// Import styles
import '@react-pdf-viewer/search/lib/styles/index.css'
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import '@react-pdf-viewer/zoom/lib/styles/index.css'
import './index.scss'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
	<Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider defaultTheme='system' storageKey='wiki-ui-theme'>
				<App />
			</ThemeProvider>
		</QueryClientProvider>
	</Worker>
)
