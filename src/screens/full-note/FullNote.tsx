import { Button } from '@/components'
import FullItemFooter from '@/components/full-item-footer/FullItemFooter'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { QUERIES } from '@/constants/query.constants'
import { useUser } from '@/context'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/router/routes'
import notesService from '@/services/notes/notes.service'
import { isAdmin } from '@/utils/isAdmin'
import { isAuthor } from '@/utils/isAuthor'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import MDEditor from '@uiw/react-md-editor'
import {
	AlertCircle,
	CircleX,
	EllipsisVertical,
	Package,
	PackageOpen,
	Pencil,
	Pin,
	PinOff,
} from 'lucide-react'
import { useState } from 'react'
import { AiFillPushpin } from 'react-icons/ai'
import { FaArrowLeft } from 'react-icons/fa6'
import { PiMaskSad } from 'react-icons/pi'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { LoadingScreen } from '../loading'
import { EditView } from './is-edit-view/EditView'

export const FullNote = () => {
	const params = useParams()
	const { user } = useUser()
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const [isEdit, setIsEdit] = useState(false)
	const { mutate: toggleActualNoteMutate } = useMutation({
		mutationKey: [QUERIES.TOGGLE_ACTUAL_NOTE],
		mutationFn: notesService.toggleActualNote,
		onSuccess(data) {
			queryClient.invalidateQueries({ queryKey: [QUERIES.GET_NOTE] })
			toast.success(data?.message?.title, {
				description: data?.message?.description,
			})
		},
		onError(error) {
			toast.error(
				// @ts-ignore
				error?.response?.data?.message
					? // @ts-ignore
					  error?.response?.data?.message
					: error.message
			)
		},
	})
	const togglePinnedMutation = useMutation({
		mutationKey: [QUERIES.NOTE_PINNED_TOGGLE],
		mutationFn: notesService.notePinnedToggle,
		onSuccess(data) {
			queryClient.invalidateQueries({ queryKey: [QUERIES.GET_NOTE] })
			toast.success(data.message.title, {
				description: data.message.description,
			})
		},
		onError(error) {
			toast.error(
				// @ts-ignore
				error?.response?.data?.message
					? // @ts-ignore
					  error?.response?.data?.message
					: error.message
			)
		},
	})
	const { mutate } = useMutation({
		mutationKey: [QUERIES.DELETE_NOTE],
		mutationFn: notesService.deleteNote,
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: [QUERIES.GET_NOTES] })
			navigate(-1)
		},
		onError(error) {
			toast.error(
				// @ts-ignore
				error?.response?.data?.message
					? // @ts-ignore
					  error?.response?.data?.message
					: error.message
			)
		},
	})

	const { data, isError, isSuccess, isLoading } = useQuery<
		any,
		any,
		ResponseNote
	>({
		queryKey: [QUERIES.GET_NOTE, params.id],
		queryFn: arg => notesService.getOneNote(String(arg.queryKey[1])!),
	})
	const deleteNote = (noteId: string) => {
		return mutate(noteId)
	}
	if (isLoading) return <LoadingScreen />
	if (isError) return <div>Error</div>
	if (data && isSuccess) {
		if (isEdit) {
			return <EditView note={data} setEdit={setIsEdit} />
		}
		return (
			<AlertDialog>
				<div
					className={cn('flex flex-col gap-10', [
						{ 'pt-10 lg:pt-3': !data.isActual },
					])}
				>
					{!data.isActual && (
						<div className='w-full h-[35px] bg-red-500/20 flex text-red-600 items-center  justify-center absolute top-0 left-0 mb-10 text-xs gap-2 select-none'>
							<AlertCircle size={16} />
							Данная публикация является неактуальной
						</div>
					)}
					<div className='flex items-center justify-between'>
						<div
							onClick={() => navigate(ROUTES.CATEGORY + data.categoriesId)}
							className='flex items-center gap-2 opacity-50 cursor-pointer w-max'
						>
							<FaArrowLeft />К списку статей
						</div>

						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									Вы действительно хотите удалить статью?
								</AlertDialogTitle>
								<AlertDialogDescription>
									После согласия статья будет удалена безвозвратно.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Отмена</AlertDialogCancel>
								<AlertDialogAction
									onClick={() => deleteNote(params.id!)}
									className='!bg-red-500 !text-white !outline-none'
								>
									Удалить
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>

						{isAuthor(data?.author?.id, user?.id!) ||
						isAdmin(user?.isAdmin!) ||
						user?.moderatedContent.find(
							categoryValid => categoryValid.id === data.categoriesId
						) ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant='outline'
										size={'icon'}
										className='rounded-full'
									>
										<EllipsisVertical />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className='w-56 mr-2 lg:mr-5'>
									<DropdownMenuGroup>
										<DropdownMenuItem
											className='cursor-pointer'
											// @ts-ignore
											onClick={() => toggleActualNoteMutate(data.id)}
										>
											{data.isActual ? (
												<Package className='w-4 h-4 mr-2' />
											) : (
												<PackageOpen className='w-4 h-4 mr-2' />
											)}
											<span className='text-xs'>
												Пометить как{' '}
												{data.isActual ? 'неактуально' : 'актуальное'}
											</span>
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem
											className='cursor-pointer'
											onClick={() => setIsEdit(true)}
										>
											<Pencil className='w-4 h-4 mr-2' />
											<span className='text-xs'>Редактировать</span>
										</DropdownMenuItem>
										{user?.isAdmin ||
										user?.moderatedContent.find(
											moderatedItem => moderatedItem.id === data.categoriesId
										) ? (
											<DropdownMenuItem
												className='cursor-pointer'
												onClick={() => togglePinnedMutation.mutate(data.id)}
											>
												{data.isPinned ? (
													<PinOff className='w-4 h-4 mr-2' />
												) : (
													<Pin className='w-4 h-4 mr-2' />
												)}
												<span className='text-xs'>
													{data.isPinned ? 'Открепить' : 'Закрепить'}
												</span>
											</DropdownMenuItem>
										) : null}
										<AlertDialogTrigger className='w-full'>
											<DropdownMenuItem className='cursor-pointer hover:!bg-red-500/10 dark:hover:text-accent dark:hover:!bg-red-500/70'>
												<CircleX className='w-4 h-4 mr-2' />
												<span className='text-xs'>Удалить</span>
											</DropdownMenuItem>
										</AlertDialogTrigger>
									</DropdownMenuGroup>
								</DropdownMenuContent>
							</DropdownMenu>
						) : null}
					</div>
					<div className='flex items-center gap-5'>
						{data.isPinned && (
							<span className='flex items-center gap-2 p-2 text-xs text-blue-700 border border-blue-700 rounded-full lg:rounded lg:px-4 lg:py-2 dark:text-blue-400 dark:border-blue-400 bg-blue-500/20 w-max'>
								<AiFillPushpin size={14} />
								<span className='hidden lg:block'>Статья закреплена</span>
							</span>
						)}
						<h1 className='text-2xl'>{data?.title}</h1>
					</div>
					<MDEditor.Markdown
						source={data?.oldContent ? data?.oldContent : data?.content}
						className='bg-light-foreground dark:bg-dark'
					/>
					<FullItemFooter {...data} />
				</div>
			</AlertDialog>
		)
	}

	return (
		<div className='flex flex-col items-center justify-center w-full h-full gap-5 opacity-50'>
			<PiMaskSad className='text-5xl' />
			<span>Упс…</span>
			<span>Похоже такой публикации не существует</span>
		</div>
	)
}
