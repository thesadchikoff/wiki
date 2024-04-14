import { ThemeSwitcher } from '@/components/ui'
import { useUser } from '@/context'
import { ROUTES } from '@/router/routes'
import userService from '@/services/user/user.service'
import { cn } from '@/utils/classnames'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Logo } from '../logo/Logo'
import { MenubarItem } from '../ui/menubar'
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
		<header className='z-50 backdrop-blur-[200px] bg-light border-b dark:border-dark shadow w-full h-[70px] flex items-center px-2 lg:px-10  dark:bg-dark/20 justify-between'>
			<Link to={ROUTES.HOME} className={cn('flex items-center gap-4 ')}>
				<Logo />
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
							<>
								<MenubarItem className='teext-black dark:text-white'>
									{user.email}
								</MenubarItem>

								<MenubarItem
									className='text-black dark:text-destructive hover:!bg-destructive hover:!text-white cursor-pointer'
									onClick={logoutHandler}
								>
									Выйти
								</MenubarItem>
							</>
						</UserMenu>
					</div>
				)}
				<ThemeSwitcher />
			</div>
		</header>
	)
}
