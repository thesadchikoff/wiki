import { ResponseNote } from '@/@types/note'
import { Button, Input } from '@/components'
import { BackLink } from '@/components/back-link/BackLink'
import { NoteItem } from '@/components/note-item/NoteItem'
import { QUERIES } from '@/constants/query.constants'
import { ROUTES } from '@/router/routes'
import categoryService from '@/services/note-category/category.service'
import notesService from '@/services/notes/notes.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LoadingScreen } from '../loading'

export const NoteListScreen = () => {
	const params = useParams()
	const navigate = useNavigate()
	const { data: category } = useQuery<any, any, CategoryResponse>({
		queryKey: [QUERIES.GET_CATEGORY, params.id],
		// @ts-ignore
		queryFn: param => categoryService.getOne(param.queryKey[1]),
	})
	const [searchValue, setSearchValue] = useState('')
	const { mutate, data, isPending, isError, isSuccess } = useMutation({
		mutationFn: notesService.searchNotes,
	})

	useEffect(() => {
		console.log(category)
		mutate({ searchValue, categoriesId: params.id! })
	}, [])

	const GetContent = () => {
		if (isPending) {
			return <LoadingScreen />
		}
		if (isError) {
			return <div>Error</div>
		}
		if (!data?.length && isSuccess) {
			return (
				<div className='flex flex-col items-center justify-center w-full h-full'>
					<span className='text-xl font-medium opacity-50'>
						Материал отсутствует
					</span>
				</div>
			)
		}
		if (data && isSuccess) {
			return (
				<div className='grid w-full grid-cols-1 gap-10 lg:grid-cols-2 xl:grid-cols-3'>
					{data.map((note: ResponseNote) => {
						return <NoteItem note={note} />
					})}
				</div>
			)
		}
	}
	return (
		<div className='flex flex-col h-full gap-10 prose-h1:prose-2xl prose-h1:font-bold prose-h2:font-bold prose-h2:prose-xl'>
			<div className='flex flex-col gap-3'>
				<div className='flex items-start justify-between gap-2 lg:items-center'>
					<BackLink url={ROUTES.CATEGORIES} title='К категориям' />
					<div className='flex flex-col items-center gap-5 lg:flex-row'>
						<Button
							size='xs'
							title='Создать'
							variant='primary-light'
							onClick={() =>
								navigate(ROUTES.CATEGORY + params.id + ROUTES.CREATE_NOTE)
							}
							className='w-max'
						/>
					</div>
				</div>
				{category?.moderators.length ? (
					<span className='flex items-center gap-2 pb-1 overflow-x-auto text-xs opacity-50 whitespace-nowrap text-nowrap'>
						Модераторы категории:{' '}
						<article className='flex items-center gap-2'>
							{category.moderators.map(moderator => (
								<a href={`mailto:${moderator.email}`}>{moderator.email}</a>
							))}
						</article>
					</span>
				) : null}
				<form
					onSubmit={e => {
						e.preventDefault()
						mutate({ searchValue, categoriesId: params.id! })
					}}
				>
					<Input
						placeholder='Поиск…'
						value={searchValue}
						onChange={e => setSearchValue(e.target.value)}
					/>
				</form>
			</div>

			<GetContent />
		</div>
	)
}
