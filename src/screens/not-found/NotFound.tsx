import { Button } from '@/components/ui/button'
import { ROUTES } from '@/router/routes'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
	const navigate = useNavigate()
	return (
		<div className='fixed top-0 left-0 flex items-center justify-center w-full h-full'>
			<div className='flex flex-col items-center gap-3'>
				<h1>Похоже, что такой страницы не существует</h1>
				<Button variant={'link'} onClick={() => navigate(ROUTES.HOME)}>
					На главную
				</Button>
			</div>
		</div>
	)
}

export default NotFound
