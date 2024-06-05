import { Header } from '@/components'
import UpdateModal from '@/components/update-modal/UpdateModal'

import { ROUTES } from '@/router/routes'
import { cn } from '@/utils/classnames'
import { PropsWithChildren, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
interface PrivateLayout extends PropsWithChildren {}
export const PrivateLayout = ({ children }: PrivateLayout) => {
	// @ts-ignore
	const [isShow, setIsShow] = useState(
		localStorage.getItem('isShowUpdateModal')
	)
	const navigate = useNavigate()

	useEffect(() => {
		document.title = 'База знаний'
	}, [])
	useEffect(() => {
		const savedData = JSON.parse(localStorage.getItem('articleData')!)
		if (savedData)
			toast.info('Несохраненные данные', {
				description: `У вас есть незавершенная статья в категории ${savedData.articleCategoryName}, написание которой было прервано.`,
				action: {
					label: 'Продолжить',
					onClick: () =>
						navigate(
							ROUTES.CATEGORY + savedData.articleCategoryId + ROUTES.CREATE_NOTE
						),
				},
			})
	}, [])

	return (
		<div
			className={cn(
				'w-full h-full flex flex-col bg-light-foreground dark:bg-dark'
			)}
		>
			<Header />

			{isShow === 'true' && <UpdateModal />}
			<main className='relative flex flex-col flex-1 h-full max-h-full p-3 overflow-y-auto lg:p-10'>
				{children}
			</main>
		</div>
	)
}
