import { Header } from '@/components'
import { AdminButton } from '@/components/system-buttons/AdminButton'
import { ModeratorButton } from '@/components/system-buttons/ModeratorButton'
import { useUser } from '@/context'
import { cn } from '@/utils/classnames'
import { PropsWithChildren } from 'react'
import { PiWarningCircleBold } from 'react-icons/pi'
interface PrivateLayout extends PropsWithChildren {}
export const PrivateLayout = ({ children }: PrivateLayout) => {
	const { user } = useUser()
	return (
		<div
			className={cn(
				'w-full h-full flex flex-col bg-light-foreground dark:bg-dark'
			)}
		>
			<div className='w-full h-[50px] px-5 flex items-center border-b dark:border-b-dark justify-center'>
				<div className='flex items-center gap-2'>
					<PiWarningCircleBold />
					<span className='text-xs'>
						В данный момент сервис работает в тестовом режиме
					</span>
				</div>
			</div>
			<Header />
			<div className='fixed z-50 flex flex-col gap-5 bottom-5 right-5'>
				{user?.moderatedContent?.length ? <ModeratorButton /> : null}
				{user?.isAdmin ? <AdminButton /> : null}
			</div>

			<main className='relative flex flex-col flex-1 p-3 overflow-y-auto lg:p-10'>
				{children}
			</main>
		</div>
	)
}
