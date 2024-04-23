import { ROUTES } from '@/router/routes'
import { MdAdminPanelSettings } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

export const AdminButton = () => {
	const navigate = useNavigate()
	const p = useLocation()
	if (p.pathname === '/mod-panel') return null
	return (
		<Button
			prefix='3'
			size={'icon'}
			onClick={() => navigate(ROUTES.MOD_PANEL)}
			className='rounded-full'
		>
			<MdAdminPanelSettings className='text-2xl' />
		</Button>
	)
}
