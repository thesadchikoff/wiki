import { ROUTES } from '@/router/routes'
import { MdAdminPanelSettings } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'

export const AdminButton = () => {
	const p = useLocation()
	if (p.pathname === '/mod-panel') return null
	return (
		<Link
			to={ROUTES.MOD_PANEL}
			className='w-[50px] h-[50px] rounded-full text-white bg-red-500 flex flex-col items-center justify-center cursor-pointer'
		>
			<MdAdminPanelSettings className='text-2xl' />
		</Link>
	)
}
