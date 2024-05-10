import { Button } from '@/components'
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
import { QUERIES } from '@/constants/query.constants'
import { useClearData } from '@/hooks/editor/useClearData'
import { ROUTES } from '@/router/routes'
import categoryService from '@/services/note-category/category.service'
import notesService from '@/services/notes/notes.service'

import { useMutation, useQuery } from '@tanstack/react-query'
import MDEditor from '@uiw/react-md-editor'
import { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

export const CreateNoteScreen = () => {
	const params = useParams()
	console.log(params)
	const [title, setTitle] = useState('')
	const [value, setValue] = useState('')
	const { data } = useQuery({
		queryKey: [QUERIES.GET_CATEGORIES, params.id],
		queryFn: params => categoryService.getOne(params.queryKey[1]!),
	})
	const { clear } = useClearData({
		localStorageKey: 'articleData',
		setStateContent: setValue,
		setStateTitle: setTitle,
	})
	const navigate = useNavigate()
	const articleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const content = event.target.value
		setTitle(content)
		localStorage.setItem(
			'articleData',
			JSON.stringify({
				articleContent: value,
				articleTitle: content,
				articleCategoryId: params!.id,
				articleCategoryName: data.title,
			})
		)
	}
	const articleEditorChange = (value: string) => {
		setValue(value)
		localStorage.setItem(
			'articleData',
			JSON.stringify({
				articleContent: value,
				articleTitle: title,
				articleCategoryId: params!.id,
				articleCategoryName: data.title,
			})
		)
	}

	const { mutate } = useMutation({
		mutationKey: [QUERIES.CREATE_NOTE],
		mutationFn: notesService.createNote,
		onSuccess() {
			toast.success('Статья отправлена на модерацию')
			navigate(ROUTES.CATEGORY + params.id)
		},
		onError(error) {
			console.error(error)
			toast.error('Ошибка создания статьи')
		},
	})

	useEffect(() => {
		const savedData = JSON.parse(localStorage.getItem('articleData')!)
		if (savedData) {
			if (!savedData.articleTitle && !savedData.articleContent) clear()
		}
	}, [value, title])

	useEffect(() => {
		const savedData = JSON.parse(localStorage.getItem('articleData')!)
		if (savedData) {
			if (savedData.articleCategoryId === params.id!) {
				setValue(savedData.articleContent)
				setTitle(savedData.articleTitle)
			}
		}
	}, [])
	const submitNote = () => {
		// @ts-ignore
		mutate({ title, content: value, categoriesId: params.id! })
		clear()
	}
	return (
		<div className='flex flex-col gap-5'>
			<div className='flex items-center justify-between'>
				<Link
					to={ROUTES.CATEGORY + params.id}
					className='flex items-center gap-2 opacity-50'
				>
					<FaArrowLeft />К списку статей
				</Link>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button>Очистить все</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Вы действительно хотите очистить форму и заголовок?
							</AlertDialogTitle>
							<AlertDialogDescription>
								После очистки формы и заголовка вернуть данные не получится.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Отмена</AlertDialogCancel>
							<AlertDialogAction onClick={clear}>Очистить</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
			<input
				value={title}
				onChange={articleTitleChange}
				type='text'
				placeholder='Название'
				className='p-5 lg:p-10 text-xl lg:text-2xl border dark:border-dark bg-light dark:bg-dark rounded-[30px] outline-none focus:border-dark-active dark:focus:border-dark-active'
			/>
			<MDEditor
				className='w-full text-black bg-light dark:bg-dark dark:text-white'
				value={value}
				// @ts-ignore
				onChange={value => articleEditorChange(value)}
				height={500}
			/>
			<Button variant={'outline'} onClick={submitNote}>
				Отправить
			</Button>
		</div>
	)
}
