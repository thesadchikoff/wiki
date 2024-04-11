import { ResponseNote } from '@/@types/note'
import { Button } from '@/components'
import { QUERIES } from '@/constants/query.constants'
import { useUser } from '@/context'
import notesService from '@/services/notes/notes.service'
import { dateFormat } from '@/utils/dateFormat'
import { isAdmin } from '@/utils/isAdmin'
import { isAuthor } from '@/utils/isAuthor'
import { isEdited } from '@/utils/isEdited'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import MDEditor from '@uiw/react-md-editor'
import { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { IoCalendar } from 'react-icons/io5'
import { MdAdminPanelSettings, MdModeEdit } from 'react-icons/md'
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
	const { mutate } = useMutation({
		mutationKey: [QUERIES.DELETE_NOTE],
		mutationFn: notesService.deleteNote,
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: [QUERIES.GET_NOTES] })
			navigate(-1)
		},
		onError(error) {
			toast.error(
				error?.response?.data?.message
					? error?.response?.data?.message
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
			<div className='flex flex-col gap-10'>
				<div
					onClick={() => navigate(-1)}
					className='flex items-center gap-2 opacity-50 cursor-pointer'
				>
					<FaArrowLeft />К списку статей
				</div>
				<MDEditor.Markdown
					source={data?.content}
					className='bg-light-foreground dark:bg-dark'
				/>
				<div className='flex flex-col items-start justify-between w-full gap-5 lg:item-center lg:flex-row'>
					<div className='flex flex-col items-start gap-5 text-lg lg:items-center lg:flex-row'>
						<span className='flex items-center gap-2 '>
							<article className='opacity-50'>
								Опубликовал {data.author?.email}
							</article>
							{isAdmin(data.author?.isAdmin!) && (
								<MdAdminPanelSettings
									title='Администратор'
									className='text-blue-500 cursor-help'
								/>
							)}
						</span>
						{isAuthor(data.author?.id, user?.id!) ||
						isAdmin(user?.isAdmin!) ||
						user?.moderatedContent.find(
							categoryValid => categoryValid.id === data.categoriesId
						) ? (
							<div className='flex items-center gap-5'>
								<Button
									title='Редактировать'
									size='xs'
									onClick={() => setIsEdit(true)}
								/>
								<Button
									title='Удалить'
									variant='danger-light'
									size='xs'
									onClick={() => deleteNote(params.id!)}
								/>
							</div>
						) : null}
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
