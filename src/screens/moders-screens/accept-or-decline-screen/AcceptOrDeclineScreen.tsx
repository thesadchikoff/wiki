import { ResponseNote } from '@/@types/note'
import { Button } from '@/components'
import { BackLink } from '@/components/back-link/BackLink'
import { QUERIES } from '@/constants/query.constants'
import { ROUTES } from '@/router/routes'
import modersService from '@/services/moders/moders.service'
import notesService from '@/services/notes/notes.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import MDEditor from '@uiw/react-md-editor'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

enum MODERATOR_ACTION {
	ACCEPT = 'ACCEPT',
	UNACCEPT = 'UNACCEPT',
}
export const AcceptOrDeclineScreen = () => {
	const params = useParams()
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const { data, isLoading, isError, isSuccess } = useQuery<ResponseNote>({
		queryKey: [QUERIES.GET_NOTE, params.id],
		// @ts-ignore
		queryFn: param => notesService.getOneNote(param.queryKey[1]),
	})
	const { mutate } = useMutation({
		mutationKey: [QUERIES.MOD_ACCEPT_NOTE_CHANGE],
		mutationFn: modersService.acceptOrDecline,
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: [QUERIES.MOD_GET_CATEGORY] })
			toast.success('Процедура выполнена успешно')
			return navigate(ROUTES.MOD_PANEL)
		},
		onError() {
			toast.error('Сервер ответил с ошибкой')
		},
	})
	return (
		<div className='flex flex-col gap-5'>
			<BackLink title='Назад' url={ROUTES.MOD_PANEL} />
			<h1 className='text-4xl font-medium'>
				Оценка публикации от {data?.author?.email}
			</h1>
			<div className='flex flex-col gap-5'>
				<h2 className='text-2xl'>{data?.title}</h2>
				<MDEditor.Markdown
					source={data?.content}
					className='bg-light-foreground dark:bg-dark'
				/>
			</div>
			<div className='flex items-center gap-5'>
				<Button
					title='Опубликовать'
					variant='primary-light'
					onClick={() =>
						mutate({ noteId: data?.id!, type: MODERATOR_ACTION.ACCEPT })
					}
				/>
				<Button
					title='Отклонить'
					variant='danger-light'
					onClick={() =>
						mutate({ noteId: data?.id!, type: MODERATOR_ACTION.UNACCEPT })
					}
				/>
			</div>
		</div>
	)
}
