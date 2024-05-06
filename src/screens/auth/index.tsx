import { Auth } from '@/components/forms'
import { useEffect } from 'react'

export const AuthScreen = () => {
	useEffect(() => {
		document.title = 'База знаний | Вход'
	}, [])
	return (
		<div className='flex items-center justify-center h-full p-3 lg:p-10'>
			<Auth />
		</div>
	)
}
