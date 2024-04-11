import { ResponseModeratorCategory, ResponseModeratorNotes } from '@/@types/mod'
import { QUERIES } from '@/constants/query.constants'
import modersService from '@/services/moders/moders.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { LoadingScreen } from '../../loading'
import { NoteList } from './note-list/NoteList'

export const ModPanel = () => {
	const { data, isLoading, isError, isSuccess } = useQuery<
		ResponseModeratorCategory[]
	>({
		queryKey: [QUERIES.MOD_GET_CATEGORY],
		queryFn: modersService.getModeratedCategory,
	})
	const {
		mutate,
		data: response,
		isPending,
		isSuccess: isNotesSuccess,
	} = useMutation<ResponseModeratorNotes>({
		mutationKey: [QUERIES.MOD_GET_NOTES],
		// @ts-ignore
		mutationFn: modersService.getNotesForModerate,
	})
	const GetSidebarContent = () => {
		if (isLoading) return <LoadingScreen />
		if (isError) return <div>Error</div>
		if (isSuccess && data) {
			return (
				<div className='flex flex-col gap-5 '>
					{data.map(category => {
						return (
							<div
								// @ts-ignore
								onClick={() => mutate(category?.id)}
								className='p-5 relative overflow-hidden flex items-center h-[50px] border rounded-lg cursor-pointer dark:border-dark dark:bg-dark bg-light-foreground hover:dark:bg-dark/80 hover:bg-light-grey/80 justify-between'
							>
								<span className='text-ellipsis'>{category.title}</span>
								{category.notes.length ? (
									<span className='z-10 flex items-center justify-center w-[20px] h-[20px] text-sm bg-red-600  text-white rounded-full'>
										{category.notes.length}
									</span>
								) : null}
								<img
									className='absolute m-auto -right-20 -top-10 blur-sm'
									src={import.meta.env.VITE_API_URL + '/' + category?.iconUrl}
									alt=''
								/>
							</div>
						)
					})}
				</div>
			)
		}
	}
	return (
		<div className='flex flex-col flex-1 gap-5 prose-h1:prose-2xl prose-h1:font-medium'>
			<h1>Кабинет модератора</h1>
			<div className='flex h-full gap-10'>
				<div className='sticky w-[300px] p-5 rounded-lg top-5 bg-light dark:bg-dark-foreground flex flex-col gap-5 overflow-y-auto'>
					<h2>Модерируемые категории</h2>
					<GetSidebarContent />
				</div>
				<div className='box-border flex flex-col flex-1 h-full px-10 overflow-y-auto rounded-lg'>
					<NoteList notes={response?.notes} category={response?.category} />
				</div>
			</div>
		</div>
	)
}
