import { Button, ThemeSwitcher } from '@/components/ui'
import { useUser } from '@/context'
import { cn } from '@/utils/classnames'

import { ROUTES } from '@/router/routes'
import userService from '@/services/user/user.service'
import { useState } from 'react'
import { FaWeebly } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { UserMenu } from '../user-menu'

export const Header = () => {
	const { user, setUser } = useUser()
	const navigate = useNavigate()
	const [isVisible, setIsVisible] = useState(false)
	const logoutHandler = () => {
		userService.logout()
		setUser(null)
		toast.info('Вы вышли из профиля')
		navigate(ROUTES.AUTH)
	}
	return (
		<header className='z-50 !backdrop-blur-3xl border-b dark:border-dark shadow w-full h-[70px] flex items-center px-2 lg:px-10 bg-light bg-opacity-10 dark:bg-dark-foreground justify-between'>
			<Link to={ROUTES.HOME} className={cn('flex items-center gap-4')}>
				<FaWeebly className={cn('text-2xl')} />
				База знаний
			</Link>
			<div className='flex items-center gap-5'>
				{user && (
					<div className='relative'>
						<UserMenu
							email={user.email}
							setState={setIsVisible}
							state={isVisible}
						>
							<div className='p-2 border-b dark:border-dark last:border-none'>
								<span className='p-1 opacity-40'>{user.email}</span>
							</div>
							<div className='p-2 border-b dark:border-dark last:border-none'>
								<Button
									onClick={logoutHandler}
									title='Выйти'
									size='xs'
									fullWidth
									variant='danger-light'
								/>
							</div>
						</UserMenu>
					</div>
				)}
				<ThemeSwitcher />
			</div>
		</header>
	)
}
