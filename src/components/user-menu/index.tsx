import { useUser } from '@/context'
import { ROUTES } from '@/router/routes'
import userService from '@/services/user/user.service'
import { LogOut, Settings2, User2, User2Icon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '../ui'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
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
					<DropdownMenuItem
						className='cursor-pointer'
						// @ts-ignore
						onClick={() => toggleActualNoteMutate(data.id)}
					>
						<User2 className='w-4 h-4 mr-2' />

						<span className='text-xs'>{user?.email}</span>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem className='cursor-pointer'>
						<Settings2 className='w-4 h-4 mr-2' />
						<span className='text-xs'>Настройки</span>
					</DropdownMenuItem>
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
