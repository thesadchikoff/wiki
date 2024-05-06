import { ROUTES } from '@/router/routes'
import { compareDate } from '@/utils/compareDate'
import { declineTool } from '@/utils/declineTool'
import { Link } from 'react-router-dom'
import { Badge } from '../ui/badge'

interface CategoryItem {
	category: CategoryResponse
}
export const CategoryItem = ({ category }: CategoryItem) => {
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
			<div className='flex items-center justify-between p-4 rounded-b bg bg-light dark:bg-dark-foreground'>
				<span>
					{category._count.notes} {declineTool(category._count.notes)}
				</span>
				{compareDate(category.createdAt) && <Badge>New</Badge>}
			</div>
		</Link>
	)
}
