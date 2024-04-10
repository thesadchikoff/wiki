import { ROUTES } from '@/router/routes'
import { FaShieldAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export const ModeratorButton = () => {
	return (
		<Link
			to={ROUTES.MOD_PANEL}
			className='fixed w-[50px] h-[50px] rounded-full bg-blue-500 flex flex-col items-center justify-center bottom-5  right-5 z-50 cursor-pointer'
		>
			<FaShieldAlt className='text-xl' />
		</Link>
	)
}
