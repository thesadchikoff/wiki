import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

const UpdateModal = () => {
	const [showModal, setShowModal] = useState(true)
	return (
		<Dialog open={showModal} onOpenChange={() => setShowModal(!showModal)}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Обновление {APP_VERSION}</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<div className='grid gap-4 py-4'>
					<div className='grid items-center grid-cols-4 gap-4'>
						<Input
							id='name'
							defaultValue='Pedro Duarte'
							className='col-span-3'
						/>
					</div>
					<div className='grid items-center grid-cols-4 gap-4'>
						<Input
							id='username'
							defaultValue='@peduarte'
							className='col-span-3'
						/>
					</div>
				</div>
				<DialogFooter>
					<Button type='submit' onClick={() => setShowModal(false)}>
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default UpdateModal
