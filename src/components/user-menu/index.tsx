import { useUser } from '@/context'
import { ROUTES } from '@/router/routes'
import userService from '@/services/user/user.service'
import { LogOut, Settings2, Shield, User2, User2Icon } from 'lucide-react'
import { MdOutlineLocalPolice } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '../ui'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export const UserMenu = () => {
	const { user, setUser } = useUser()
	const navigate = useNavigate()
	const logoutHandler = () => {
		userService.logout()
		setUser(null)
		toast.info('Вы вышли из профиля')
		navigate(ROUTES.AUTH)
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size={'icon'} className='rounded-full'>
					<User2Icon size={20} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56 mr-2 lg:mr-5'>
				<DropdownMenuGroup>
					<DropdownMenuLabel>Профиль</DropdownMenuLabel>
					<DropdownMenuItem
						className='cursor-pointer group'
						// @ts-ignore
						onClick={() => toggleActualNoteMutate(data.id)}
					>
						<User2 className='w-4 h-4 mr-2 dark:group-hover:stroke-black' />

						<span className='text-xs dark:group-hover:text-black'>
							{user?.email}
						</span>
					</DropdownMenuItem>

					<DropdownMenuItem
						onClick={() => navigate(ROUTES.SETTINGS)}
						className='cursor-pointer group'
					>
						<Settings2 className='w-4 h-4 mr-2 dark:group-hover:stroke-black' />
						<span className='text-xs dark:group-hover:text-black'>
							Настройки
						</span>
					</DropdownMenuItem>
					{(user?.moderatedContent?.length || user?.isAdmin) && (
						<div>
							<DropdownMenuSeparator />
							<DropdownMenuLabel>Специальные возможности</DropdownMenuLabel>

							{user?.moderatedContent?.length && (
								<DropdownMenuItem
									onClick={() => navigate(ROUTES.MOD_PANEL)}
									className='cursor-pointer group'
								>
									<Shield className='w-4 h-4 mr-2 dark:group-hover:stroke-black' />
									<span className='text-xs dark:group-hover:text-black'>
										Кабинет модератора
									</span>
								</DropdownMenuItem>
							)}
							{user.isAdmin && (
								<DropdownMenuItem
									onClick={() => navigate(ROUTES.MOD_PANEL)}
									className='cursor-pointer group'
								>
									<MdOutlineLocalPolice className='w-4 h-4 mr-2 dark:group-hover:stroke-black' />
									<span className='text-xs dark:group-hover:text-black'>
										Администрирование
									</span>
								</DropdownMenuItem>
							)}
							<DropdownMenuSeparator />
						</div>
					)}

					<DropdownMenuItem
						className='cursor-pointer hover:!bg-red-500/10 dark:hover:text-accent dark:hover:!bg-red-500/70'
						onClick={logoutHandler}
					>
						<LogOut className='w-4 h-4 mr-2' />
						<span className='text-xs'>Выйти</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
