import { Header } from '@/components'
import UpdateModal from '@/components/update-modal/UpdateModal'
import { UserPermission } from '@/components/user-permission/UserPermission'
import { cn } from '@/utils/classnames'
import { PropsWithChildren, useState } from 'react'
interface PrivateLayout extends PropsWithChildren {}
export const PrivateLayout = ({ children }: PrivateLayout) => {
	// @ts-ignore
	const [isShow, setIsShow] = useState(
		localStorage.getItem('isShowUpdateModal')
	)

	return (
		<div
			className={cn(
				'w-full h-full flex flex-col bg-light-foreground dark:bg-dark'
			)}
		>
			<Header />
			<UserPermission />
			{isShow === 'true' && <UpdateModal />}
			<main className='relative flex flex-col flex-1 p-3 overflow-y-auto lg:p-10'>
				{children}
			</main>
		</div>
	)
}
