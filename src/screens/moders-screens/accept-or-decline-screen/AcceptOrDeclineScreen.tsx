import { Button } from '@/components'
import { BackLink } from '@/components/back-link/BackLink'
import { QUERIES } from '@/constants/query.constants'
import { ROUTES } from '@/router/routes'
import modersService from '@/services/moders/moders.service'
import notesService from '@/services/notes/notes.service'
import { cn } from '@/utils/classnames'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import MDEditor from '@uiw/react-md-editor'
import { Loader2 } from 'lucide-react'
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
	const { data } = useQuery<ResponseNote>({
		queryKey: [QUERIES.GET_NOTE, params.id],
		// @ts-ignore
		queryFn: param => notesService.getOneNote(param.queryKey[1]),
	})
	const { mutate, isPending } = useMutation({
		mutationKey: [QUERIES.MOD_ACCEPT_NOTE_CHANGE],
		mutationFn: modersService.acceptOrDecline,
		onSuccess(data) {
			queryClient.invalidateQueries({ queryKey: [QUERIES.MOD_GET_CATEGORY] })
			toast.success(data.message.title, {
				description: data.message.description,
			})
			return navigate(ROUTES.MOD_PANEL)
		},
		onError() {
			toast.error('Сервер ответил с ошибкой')
		},
	})
	return (
		<div className='flex flex-col gap-5'>
			<BackLink title='Назад' url={ROUTES.MOD_PANEL} />
			<div className='flex items-center gap-5'>
				<h1 className='text-2xl font-medium opacity-70'>
					{data?.author ? `От ${data?.author?.email}` : 'Автор удален'}
				</h1>
				<span
					className={cn(
						'px-4 py-1 text-xs text-blue-500 rounded bg-blue-500/20',
						[{ 'bg-orange-500/20 text-orange-500': !data?.isEdited }]
					)}
				>
					{data?.isEdited ? 'На редактирование' : 'На публикацию'}
				</span>
			</div>
			<hr />
			<div className='flex flex-col gap-5'>
				<h2 className='text-2xl'>{data?.title}</h2>
				<MDEditor.Markdown
					source={data?.content}
					className='bg-light-foreground dark:bg-dark'
				/>
			</div>
			<div className='flex items-center gap-5'>
				<Button
					className='flex items-center gap-2'
					variant={'default'}
					onClick={() =>
						mutate({ noteId: data?.id!, type: MODERATOR_ACTION.ACCEPT })
					}
				>
					{isPending && <Loader2 className='text-[10px] animate-spin' />}
					Опубликовать
				</Button>
				<Button
					className='flex items-center gap-2'
					variant={'destructive'}
					disabled={isPending}
					onClick={() =>
						mutate({ noteId: data?.id!, type: MODERATOR_ACTION.UNACCEPT })
					}
				>
					{isPending && <Loader2 className='text-[10px] animate-spin' />}
					Отклонить
				</Button>
			</div>
		</div>
	)
}
