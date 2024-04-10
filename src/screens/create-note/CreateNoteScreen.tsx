import { Button } from '@/components'
import { QUERIES } from '@/constants/query.constants'
import { ROUTES } from '@/router/routes'
import notesService from '@/services/notes/notes.service'
import { useMutation } from '@tanstack/react-query'
import MDEditor from '@uiw/react-md-editor'
import { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

export const CreateNoteScreen = () => {
	const params = useParams()
	const [title, setTitle] = useState('')
	const [value, setValue] = useState('')
	const navigate = useNavigate()
	const { mutate } = useMutation({
		mutationKey: [QUERIES.CREATE_NOTE],
		mutationFn: notesService.createNote,
		onSuccess() {
			toast.success('Статья успешно создана')
			navigate(ROUTES.CATEGORY + params.id)
		},
		onError(error) {
			console.error(error)
			toast.error('Ошибка создания статьи')
		},
	})

	return (
		<div className='flex flex-col gap-5'>
			<Link
				to={ROUTES.CATEGORY + params.id}
				className='flex items-center gap-2 opacity-50'
			>
				<FaArrowLeft />К списку статей
			</Link>
			<input
				value={title}
				onChange={e => setTitle(e.target.value)}
				type='text'
				placeholder='Название'
				className='p-5 lg:p-10 text-xl lg:text-2xl border dark:border-dark bg-light dark:bg-dark rounded-[30px] outline-none focus:border-dark-active dark:focus:border-dark-active'
			/>
			<MDEditor
				className='w-full text-black bg-light dark:bg-dark dark:text-white'
				value={value}
				// @ts-ignore
				onChange={setValue}
				height={500}
			/>
			<Button
				title='Отправить'
				onClick={() =>
					mutate({ title, content: value, categoriesId: params.id! })
				}
				variant='primary-light'
			/>
		</div>
	)
}
