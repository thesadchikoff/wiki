import { ResponseNote } from '@/@types/note'
import { ROUTES } from '@/router/routes'
import { dateFormat } from '@/utils/dateFormat'
import { IoCalendar } from 'react-icons/io5'
import { Link, useParams } from 'react-router-dom'

interface NoteItem {
	note: ResponseNote
}

export const NoteItem = ({ note }: NoteItem) => {
	const params = useParams()
	return (
		<Link
			to={ROUTES.CATEGORY + params.id + '/note/' + note.id}
			className='flex flex-col gap-5 px-6 py-4 transition-transform duration-150 border shadow cursor-pointer select-none hover:scale-105 bg-light dark:bg-dark-foreground rounded-xl dark:border-dark active:scale-95'
		>
			<div className='flex items-center justify-between'>
				<h2>{note.title}</h2>
			</div>
			<div className='flex items-center justify-between text-xs opacity-40'>
				<span>Автор: {note.author.email}</span>
				<span className='flex items-center gap-2'>
					<IoCalendar />
					{dateFormat(note.createdAt)}
				</span>
			</div>
		</Link>
	)
}
