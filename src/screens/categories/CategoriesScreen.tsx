import { Button } from '@/components'
import { QUERIES } from '@/constants/query.constants'
import { useUser } from '@/context'
import { ROUTES } from '@/router/routes'
import categoryService from '@/services/note-category/category.service'
import { declineTool } from '@/utils/declineTool'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
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
						<Button
							size='xs'
							title='Создать категорию'
							onClick={() => navigate(ROUTES.CREATE_CATEGORY)}
						/>
					)}
				</div>
				<div className='grid grid-cols-1 gap-5 lg:grid-cols-3 xl:grid-cols-4'>
					{data.map(category => {
						return (
							<Link
								to={ROUTES.CATEGORY + category.id}
								className='relative flex flex-col w-full transition-transform duration-150 border rounded shadow-lg cursor-pointer select-none active:scale-95 hover:scale-105 dark:border-dark prose-h1:text-white'
							>
								<div
									style={{
										background: `linear-gradient(${category.angle}.00deg, ${category.bannerColorLeft} 0%,${category.bannerColorRight} 100%)`,
									}}
									className='flex items-center justify-between flex-1 w-full p-2 rounded-t'
								>
									<h1>{category.title}</h1>
									<div
										style={{
											backgroundImage: `url(${
												import.meta.env.VITE_API_URL + '/' + category.iconUrl
											})`,
											backgroundRepeat: 'no-repeat',
											backgroundSize: 'cover',
											backgroundPosition: 'center',
											width: 150,
											height: 150,
										}}
									/>
								</div>
								<div className='p-4 rounded-b bg bg-light dark:bg-dark-foreground'>
									<span>
										{category._count.notes} {declineTool(category._count.notes)}
									</span>
								</div>
							</Link>
						)
					})}
				</div>
			</div>
		)
	}
}
