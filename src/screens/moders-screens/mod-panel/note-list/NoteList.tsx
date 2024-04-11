import { ResponseNote } from '@/@types/note'
import { ROUTES } from '@/router/routes'
import { dateFormat } from '@/utils/dateFormat'
import { PropsWithChildren } from 'react'
import { FaUserLarge } from 'react-icons/fa6'
import { FiClock } from 'react-icons/fi'
import { Link } from 'react-router-dom'

interface NoteList {
	notes: ResponseNote[] | undefined
	category: CategoryResponse | undefined
}
export const NoteList = ({ notes, category }: NoteList) => {
	const NoteListHeader = ({
		title,
		children,
	}: { title: string } & PropsWithChildren) => {
		return (
			<div className='flex flex-col h-full gap-10'>
				<h1 className='!text-3xl font-medium'>{title}</h1>
				{children}
			</div>
		)
	}
	const RenderContent = () => {
		if (category) {
			if (!notes?.length)
				return (
					<NoteListHeader title={category.title}>
						<div className='flex flex-col items-center justify-center h-full'>
							<span className='opacity-50'>Нет заявок на модерацию</span>
						</div>
					</NoteListHeader>
				)
			return (
				<NoteListHeader title={category.title}>
					{notes.map(note => (
						<Link
							to={ROUTES.MOD_ACCEPT_NOTES + note.id}
							className='flex flex-col gap-2 p-3 transition-transform duration-150 rounded-lg shadow-lg cursor-pointer hover:scale-105 bg-light dark:bg-dark-foreground'
						>
							<div className='flex items-center justify-between pb-2 border-b dark:border-b-dark'>
								<span>{note.title}</span>
								<div className='flex items-center gap-2 text-xs opacity-50 '>
									<FiClock />
									{dateFormat(note.createdAt)}
								</div>
							</div>
							<div>
								<span className='flex items-center gap-2 text-xs opacity-50'>
									<FaUserLarge />
									{note?.author?.email}
								</span>
							</div>
						</Link>
					))}
				</NoteListHeader>
			)
		}
	}
	return (
		<div className='flex flex-col w-full h-full gap-5'>
			<RenderContent />
		</div>
	)
}
