import { QUERIES } from '@/constants/query.constants'
import { LoadingScreen } from '@/screens/loading'
import docsService from '@/services/docs/docs.service'
import { useQuery } from '@tanstack/react-query'
import DocItem from './DocItem'

const DocsList = () => {
	const { data, isLoading, isError, isSuccess } = useQuery({
		queryKey: [QUERIES.GET_DOCS],
		queryFn: docsService.getAll,
	})
	if (isLoading) return <LoadingScreen />
	if (isError) {
		return (
			<div className='w-full h-full'>
				<span>Error</span>
			</div>
		)
	}
	if (isSuccess && data) {
		return (
			<div className='grid grid-cols-1 gap-10 lg:grid-cols-3'>
				{data.map(doc => (
					<DocItem {...doc} />
				))}
			</div>
		)
	}
	return <div>Docs not Found</div>
}

export default DocsList
