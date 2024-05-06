import { Button } from '@/components'
import RenderUserBadge from '@/components/forms/auth/components/render-user-badge/RenderUserBadge'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card'
import { QUERIES } from '@/constants/query.constants'
import { useUser } from '@/context'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/router/routes'
import notesService from '@/services/notes/notes.service'
import { dateFormat } from '@/utils/dateFormat'
import { isAdmin } from '@/utils/isAdmin'
import { isAuthor } from '@/utils/isAuthor'
import { isEdited } from '@/utils/isEdited'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import MDEditor from '@uiw/react-md-editor'
import {
	AlertCircle,
	CalendarDaysIcon,
	CircleX,
	EllipsisVertical,
	Package,
	PackageOpen,
	Pencil,
} from 'lucide-react'
import { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { IoCalendar } from 'react-icons/io5'
import { MdModeEdit } from 'react-icons/md'
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
					{isAuthor(data.author?.id, user?.id!) ||
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
									<DropdownMenuItem
										className='cursor-pointer hover:!bg-red-500/10 dark:hover:text-accent dark:hover:!bg-red-500/70'
										onClick={() => deleteNote(params.id!)}
									>
										<CircleX className='w-4 h-4 mr-2' />
										<span className='text-xs'>Удалить</span>
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					) : null}
				</div>
				<h1 className='text-2xl'>{data?.title}</h1>
				<MDEditor.Markdown
					source={data?.oldContent ? data?.oldContent : data?.content}
					className='bg-light-foreground dark:bg-dark'
				/>
				<div className='flex flex-col items-start justify-between w-full gap-5 lg:item-center lg:flex-row'>
					<div className='flex flex-col items-start gap-5 text-lg lg:items-center lg:flex-row'>
						<span className='flex items-center gap-2 '>
							<HoverCard>
								<HoverCardTrigger asChild>
									<article className='flex items-center gap-2 opacity-50'>
										Опубликовал{' '}
										<article className='underline cursor-pointer'>
											{data.author?.email}
										</article>
									</article>
								</HoverCardTrigger>
								<HoverCardContent className='w-80'>
									<div className='flex justify-between space-x-4'>
										<div className='space-y-1'>
											<h4 className='text-sm font-semibold'>
												{data.author?.email}
											</h4>
											<p className='text-sm'>
												<RenderUserBadge {...data.author} />
											</p>
											<div className='flex items-center pt-2'>
												<CalendarDaysIcon className='w-4 h-4 mr-2 opacity-70' />{' '}
												<span className='text-xs text-muted-foreground '>
													Зарегистрирован {dateFormat(data.author.createdAt)}
												</span>
											</div>
										</div>
									</div>
								</HoverCardContent>
							</HoverCard>
						</span>
					</div>
					<span className='flex items-center gap-2 text-xs opacity-50 lg:text-lg'>
						{isEdited(data) ? <MdModeEdit /> : <IoCalendar />}
						Публикация
						{isEdited(data) ? ' отредактирована' : ' размещена'}{' '}
						{dateFormat(isEdited(data) ? data.updatedAt : data.createdAt)}
					</span>
				</div>
			</div>
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
