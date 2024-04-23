import { ROUTES } from '@/router/routes'
import { ShieldHalf } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui'

interface ModeratorButton {
	isMark?: boolean
}

export const ModeratorButton = ({ isMark = false }: ModeratorButton) => {
	const p = useLocation()
	const navigate = useNavigate()
	if (p.pathname === '/mod-panel') return null
	return (
		<Button
			prefix='3'
			size={'icon'}
			onClick={() => navigate(ROUTES.MOD_PANEL)}
			className='rounded-full'
			variant={'destructive'}
		>
			<ShieldHalf className='text-2xl' />
		</Button>
	)
}
