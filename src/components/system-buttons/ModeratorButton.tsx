import { ROUTES } from '@/router/routes'
import { FaShieldAlt } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

interface ModeratorButton {
	isMark?: boolean
}

export const ModeratorButton = ({ isMark = false }: ModeratorButton) => {
	const p = useLocation()
	if (p.pathname === '/mod-panel') return null
	return (
		<Link
			to={ROUTES.MOD_PANEL}
			className='w-[50px] h-[50px] rounded-full text-white bg-blue-500 flex flex-col items-center justify-center cursor-pointer relative'
		>
			{isMark && (
				<div className='w-[12px] h-[12px] absolute bg-red-500 right-[1px] top-[1px] border-2 rounded-full  dark:border-dark' />
			)}
			<FaShieldAlt className='text-xl' />
		</Link>
	)
}
