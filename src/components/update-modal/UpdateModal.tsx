import doodle from '@/assets/modal.png'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'

const UpdateModal = () => {
	const [showModal, setShowModal] = useState(true)
	const toggleModal = () => {
		localStorage.setItem('isShowUpdateModal', 'false')
		setShowModal(!showModal)
	}
	return (
		<Dialog open={showModal} onOpenChange={toggleModal}>
			<DialogContent className='sm:max-w-[425px] overflow-y-auto'>
				<DialogHeader>
					<DialogTitle>Обновление {APP_VERSION}</DialogTitle>
					<DialogDescription className='pl-5 text-start'>
						<ul className='list-disc'>
							<li>Измененная система модерации</li>
							<li>Собственное меню для каждой статьи</li>
							<li>Разделение статей на актуальные и неактуальные</li>
						</ul>
					</DialogDescription>
				</DialogHeader>
				<div className='flex items-center justify-center w-full'>
					<img src={doodle} alt='' />
				</div>
				<DialogFooter>
					<Button type='submit' onClick={toggleModal}>
						Супер!
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default UpdateModal
