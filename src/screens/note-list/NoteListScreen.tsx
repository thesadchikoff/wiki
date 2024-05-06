import { Button, Input } from '@/components'
import { BackLink } from '@/components/back-link/BackLink'
import { NoteItem } from '@/components/note-item/NoteItem'
import PaginationSection from '@/components/pagination-section/PaginationSection'
import { QUERIES } from '@/constants/query.constants'
import { ROUTES } from '@/router/routes'
import categoryService from '@/services/note-category/category.service'
import notesService from '@/services/notes/notes.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { LoadingScreen } from '../loading'

export const NoteListScreen = () => {
	const params = useParams()
	const navigate = useNavigate()

	const location = useLocation()
	const queryParams = queryString.parse(location.search)
	// @ts-ignore
	const currentPage = parseInt(queryParams.page, 10) || 1
	const [renderPages, setRenderPages] = useState<number[]>([])
	const [totalPages, setTotalPages] = useState(0)
	const [pages, setPages] = useState([])
	const pagesToShowBeforeCurrent = 2
	const pagesToShowAfterCurrent = 2
	const pagesToShowBeforeEllipsis = 5
	const visiblePages = []
	if (currentPage > pagesToShowBeforeEllipsis) {
		visiblePages.push(null) // null будет использоваться вместо PaginationEllipsis
	}

	// Добавляем страницы до текущей страницы
	for (let i = currentPage - pagesToShowBeforeCurrent; i < currentPage; i++) {
		if (i > 1) {
			visiblePages.push(i)
		}
	}

	// Добавляем текущую страницу
	visiblePages.push(currentPage)

	// Добавляем страницы после текущей страницы
	for (
		let i = currentPage + 1;
		i <= currentPage + pagesToShowAfterCurrent;
		i++
	) {
		if (i < totalPages) {
			visiblePages.push(i)
		}
	}

	// Добавляем PaginationEllipsis в конце, если нужно
	if (currentPage < totalPages - pagesToShowBeforeEllipsis) {
		visiblePages.push(null)
	}

	// Добавляем последнюю страницу
	if (totalPages > 1) {
		visiblePages.push(totalPages)
	}
	const { data: category } = useQuery<any, any, CategoryResponse>({
		queryKey: [QUERIES.GET_CATEGORY, params.id],
		// @ts-ignore
		queryFn: param => categoryService.getOne(param.queryKey[1]),
	})
	const [searchValue, setSearchValue] = useState('')
	const { mutate, data, isPending, isError, isSuccess } = useMutation({
		mutationFn: notesService.searchNotes,
		onSuccess(data) {
			setTotalPages(data?.pages)
			// @ts-ignore
			setPages(Array.from({ length: data?.pages }, (_, index) => index + 1))
		},
	})

	const handlePrevious = () => {
		if (currentPage > 1) {
			const newPage = currentPage - 1
			updateQueryParam(newPage)
			mutate({ searchValue, categoriesId: params.id!, page: newPage })
		}
	}

	const handleNext = () => {
		if (currentPage < totalPages) {
			const newPage = currentPage + 1
			updateQueryParam(newPage)
			mutate({ searchValue, categoriesId: params.id!, page: newPage })
		}
	}

	const handlePageClick = (page: number) => {
		updateQueryParam(page)
		mutate({ searchValue, categoriesId: params.id!, page })
	}

	const updateQueryParam = (page: number) => {
		// Обновляем query параметр страницы в URL
		navigate(`?page=${page}`)
	}
	// @ts-ignore
	const handlePageChange = (action, newPage = null) => {
		let updatedPage = currentPage

		if (action === 'previous') {
			updatedPage = currentPage > 1 ? currentPage - 1 : 1
		} else if (action === 'next') {
			updatedPage = currentPage < totalPages ? currentPage + 1 : totalPages
		} else if (action === 'pageClick' && newPage !== null) {
			updatedPage = newPage
		}
		updateQueryParam(updatedPage)
		mutate({ searchValue, categoriesId: params.id!, page: updatedPage })
	}

	useEffect(() => {
		mutate({ searchValue, categoriesId: params.id!, page: currentPage })
	}, [])

	useEffect(() => {
		for (let i = 0; i < pages.length; i++) {
			if (pages[i] >= currentPage - 2 && pages[i] <= currentPage + 2) {
				setRenderPages([...renderPages, pages[i]])
			}
		}
		console.log(renderPages)
	}, [currentPage])

	const GetContent = () => {
		if (isPending) {
			return <LoadingScreen />
		}
		if (isError) {
			return <div>Error</div>
		}
		if (!data?.notes?.length && isSuccess) {
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
				<div className='grid w-full grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3'>
					{data.notes.map((note: ResponseNote) => {
						return <NoteItem note={note} />
					})}
				</div>
			)
		}
	}
	return (
		<div className='flex flex-col flex-1 gap-10 prose-h1:prose-2xl prose-h1:font-bold prose-h2:font-bold prose-h2:prose-xl'>
			<div className='flex flex-col gap-3'>
				<div className='flex items-start justify-between gap-2 lg:items-center'>
					<BackLink url={ROUTES.CATEGORIES} title='К категориям' />
					<div className='flex flex-col items-center gap-5 lg:flex-row'>
						<Button
							onClick={() =>
								navigate(ROUTES.CATEGORY + params.id + ROUTES.CREATE_NOTE)
							}
							className='w-max'
						>
							Создать
						</Button>
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

			<div className='flex-1'>
				<GetContent />
			</div>

			<PaginationSection
				totalPages={pages.length}
				currentPage={currentPage}
				handleNext={handleNext}
				handlePrevious={handlePrevious}
				handlePageClick={handlePageClick}
			/>
		</div>
	)
}
