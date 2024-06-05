import { cn } from '@/utils/classnames'
import { AiOutlineLoading } from 'react-icons/ai'

export const LoadingScreen = () => {
	return (
		<div className='flex flex-col items-center justify-center w-full h-full bg-transparent'>
			<AiOutlineLoading
				className={cn(
					'animate-spin text-4xl text-black opacity-50 dark:text-white'
				)}
			/>
		</div>
	)
}
