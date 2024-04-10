import { Header } from '@/components'
import { cn } from '@/utils/classnames'
import { PropsWithChildren } from 'react'
interface PublicLayout extends PropsWithChildren {}
export const PublicLayout = ({ children }: PublicLayout) => {
	return (
		<div
			className={cn(
				'w-full h-full flex flex-col bg-light-foreground dark:bg-dark'
			)}
		>
			<Header />
			<main className='flex-1'>{children}</main>
		</div>
	)
}
