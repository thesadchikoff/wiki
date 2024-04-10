import { FaArrowLeft } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
interface BackLink {
	url: string
	title: string
}
export const BackLink = ({ url, title }: BackLink) => {
	return (
		<Link
			to={url}
			className='flex items-center gap-2 opacity-50 cursor-pointer'
		>
			<FaArrowLeft />
			{title}
		</Link>
	)
}
