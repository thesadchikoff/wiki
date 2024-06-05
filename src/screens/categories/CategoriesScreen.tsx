import { Button } from '@/components'
import { CategoryItem } from '@/components/category-item/CategoryItem'
import { QUERIES } from '@/constants/query.constants'
import { useUser } from '@/context'
import { ROUTES } from '@/router/routes'
import categoryService from '@/services/note-category/category.service'
import { useQuery } from '@tanstack/react-query'
import { FaFilePdf } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { LoadingScreen } from '../loading'

export const CategoriesScreen = () => {
	const navigate = useNavigate()
	const { user } = useUser()
	const { data, isLoading, isError, isSuccess } = useQuery<
		any,
		any,
		CategoryResponse[]
	>({
		queryKey: [QUERIES.GET_CATEGORIES],
		queryFn: categoryService.getAllCategories,
	})

	if (isLoading) return <LoadingScreen />
	if (isError) return <div>Error</div>
	if (data && isSuccess) {
		return (
			<div className='flex flex-col w-full gap-10 prose-h1:prose-2xl'>
				<div className='flex flex-col gap-2 lg:items-center lg:justify-between lg:flex-row'>
					<span className='text-lg lg:text-2xl'>
						Документации по категориям
					</span>
					<div className='flex items-center gap-5'>
						{user?.isAdmin && (
							<Button onClick={() => navigate(ROUTES.CREATE_CATEGORY)}>
								Создать категорию
							</Button>
						)}
						<Button
							onClick={() => navigate(ROUTES.PDF_LIST)}
							className='!bg-brand !text-white hover:!bg-brand/80 flex items-center gap-2'
						>
							<FaFilePdf />
							PDF Docs
						</Button>
					</div>
				</div>

				<div className='grid grid-cols-1 gap-5 lg:grid-cols-3 xl:grid-cols-4'>
					{data.map(category => {
						return <CategoryItem category={category} />
					})}
				</div>
			</div>
		)
	}
}
