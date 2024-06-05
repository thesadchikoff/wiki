import { BackLink } from '@/components/back-link/BackLink'
import { QUERIES } from '@/constants/query.constants'
import { useTheme } from '@/context/theme/ThemeProvider'
import { ROUTES } from '@/router/routes'
import docsService from '@/services/docs/docs.service'
import { bookmarkPlugin } from '@react-pdf-viewer/bookmark'
import { CharacterMap, LocalizationMap, Viewer } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import ru_RU from '@react-pdf-viewer/locales/lib/ru_RU.json'
import { searchPlugin } from '@react-pdf-viewer/search'
import { zoomPlugin } from '@react-pdf-viewer/zoom'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { LoadingScreen } from './loading'

const PdfViewerScreen = () => {
	const characterMap: CharacterMap = {
		isCompressed: true,
		url: 'https://unpkg.com/pdfjs-dist@2.6.347/cmaps/',
	}
	const defaultLayoutPluginInstance = defaultLayoutPlugin()
	const searchPluginInstance = searchPlugin()
	const zoomPluginInstance = zoomPlugin()
	const { theme } = useTheme()
	console.log(theme)
	const params = useParams()
	const { data, isSuccess, isError, isLoading } = useQuery({
		queryKey: [QUERIES.GET_DOC, params.id],
		queryFn: id => docsService.getOne(id.queryKey[1]),
	})
	const bookmarkPluginInstance = bookmarkPlugin()
	if (isLoading) return <LoadingScreen />
	if (isError)
		return (
			<div className='items-center justify-center flex-1'>
				<span>Ошибка при загрузке документа</span>
			</div>
		)
	if (isSuccess && data) {
		return (
			<div className='absolute top-0 left-0 w-full h-full'>
				<Viewer
					enableSmoothScroll
					httpHeaders={{ f: 'f' }}
					theme={theme === 'dark' ? 'dark' : 'light'}
					localization={ru_RU as unknown as LocalizationMap}
					fileUrl={import.meta.env.VITE_API_URL + '/' + data.fileUrl.toString()}
					plugins={[
						searchPluginInstance,
						bookmarkPluginInstance,
						defaultLayoutPluginInstance,
						zoomPluginInstance,
					]}
					characterMap={characterMap}
				/>
			</div>
		)
	}

	return (
		<div className='flex flex-1'>
			<div>
				<BackLink title='Назад' url={ROUTES.PDF_LIST} />
			</div>
			<div className='flex items-center justify-center flex-1'>
				<span className='font-semibold opacity-70'>Документ не найден</span>
			</div>
		</div>
	)
}

export default PdfViewerScreen
