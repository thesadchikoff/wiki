import { ResponseNote } from '@/@types/note'
import { Button } from '@/components'
import { QUERIES } from '@/constants/query.constants'
import { LoadingScreen } from '@/screens/loading'
import notesService from '@/services/notes/notes.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import MDEditor from '@uiw/react-md-editor'
import { useState } from 'react'
import { toast } from 'sonner'

interface EditView {
	note: ResponseNote
	setEdit: (state: boolean) => void
}
export const EditView = ({ note, setEdit }: EditView) => {
	const [content, setContent] = useState(note.content)
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: [QUERIES.UPDATE_NOTE],
		mutationFn: () => notesService.updateNote(note.id, { content }),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: [QUERIES.GET_NOTE] })
			toast.success('Статья успешно отредактирована и отправлена на модерацию')
			setEdit(false)
		},
		onError(error) {
			console.log(error)
			toast.error('Сервер ответил с ошибкой')
		},
	})
	if (isPending) return <LoadingScreen />
	return (
		<div className='flex flex-col gap-10'>
			<MDEditor
				// className='w-full text-black bg-light dark:bg-dark dark:text-white'
				value={content}
				// @ts-ignore
				onChange={setContent}
				height={500}
			/>
			<div className='flex items-center gap-5'>
				{/* @ts-ignore */}
				<Button title='Опубликовать' variant='primary-light' onClick={mutate} />
				<Button
					title='Отмена'
					variant='danger-light'
					onClick={() => setEdit(false)}
				/>
			</div>
		</div>
	)
}
