import { useUser } from '@/context'
import { ROUTES } from '@/router/routes'
import { cn } from '@/utils/classnames'
import { Link } from 'react-router-dom'
import { ModeToggle } from '../change-theme/ChangeTheme'
import { Logo } from '../logo/Logo'
import { UserMenu } from '../user-menu'

export const Header = () => {
	const { user } = useUser()

	return (
		<header className='z-50 backdrop-blur-[200px] bg-light border-b dark:border-dark shadow w-full !h-[70px] flex items-center px-2 lg:px-10  dark:bg-dark/20 justify-between'>
			<Link to={ROUTES.HOME} className={cn('flex items-center gap-4 ')}>
				<Logo />
			</Link>

			<div className='flex items-center gap-5'>
				{user && (
					<div className='relative'>
						<UserMenu />
					</div>
				)}
				<ModeToggle />
			</div>
		</header>
	)
}
