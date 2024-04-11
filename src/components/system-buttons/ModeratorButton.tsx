import { ROUTES } from '@/router/routes'
import { FaShieldAlt } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

export const ModeratorButton = () => {
	const p = useLocation()
	if (p.pathname === '/mod-panel') return null
	return (
		<Link
			to={ROUTES.MOD_PANEL}
			className='w-[50px] h-[50px] rounded-full text-white bg-blue-500 flex flex-col items-center justify-center cursor-pointer'
		>
			<FaShieldAlt className='text-xl' />
		</Link>
	)
}
