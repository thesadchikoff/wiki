import { PiWarningCircleBold } from 'react-icons/pi'

interface MainInfoWidget {
	title: string
}
export const MainInfoWidget = ({ title }: MainInfoWidget) => {
	return (
		<div className='w-full h-[50px] px-5 flex items-center border-b dark:border-b-dark justify-center'>
			<div className='flex items-center gap-2'>
				<PiWarningCircleBold />
				<span className='text-xs'>{title}</span>
			</div>
		</div>
	)
}
