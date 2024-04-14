import { Button } from '@/components'

// import { Button } from "@/components/ui/button"
import { CategoryItem } from '@/components/category-item/CategoryItem'
import { QUERIES } from '@/constants/query.constants'
import { useUser } from '@/context'
import { ROUTES } from '@/router/routes'
import categoryService from '@/services/note-category/category.service'
import { useQuery } from '@tanstack/react-query'
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
				<div className='flex items-center justify-between'>
					<span className='text-lg lg:text-2xl'>
						Документации по категориям
					</span>
					{user?.isAdmin && (
						<Button onClick={() => navigate(ROUTES.CREATE_CATEGORY)}>
							Создать категорию
						</Button>
					)}
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
