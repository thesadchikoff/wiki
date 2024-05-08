import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { ROUTES } from '@/router/routes'
import { cn } from '@/utils/classnames'
import { dateFormat } from '@/utils/dateFormat'
import { AiFillPushpin } from 'react-icons/ai'
import { IoCalendar } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'
import { Badge } from '../ui/badge'
interface NoteItem {
	note: ResponseNote
}

export const NoteItem = ({ note }: NoteItem) => {
	const params = useParams()
	const navigate = useNavigate()
	return (
		<Card
			className={cn('overflow-hidden cursor-pointer', [
				{
					'border-2 !border-brand relative': note.isPinned,
				},
			])}
			onClick={() => navigate(ROUTES.CATEGORY + params.id + '/note/' + note.id)}
		>
			{note.isPinned && (
				<article className='absolute top-0 right-0 w-[24px]  h-[24px] bg-brand flex items-center justify-center rounded-bl-full'>
					<div className='relative w-full h-full'>
						<AiFillPushpin className='absolute top-0 right-0' />
					</div>
				</article>
			)}
			<CardHeader>
				<CardTitle>{note.title}</CardTitle>
				<CardDescription>{note.author.email}</CardDescription>
			</CardHeader>
			{/* <CardContent className='z-0'></CardContent> */}
			<CardFooter className='flex justify-between'>
				<span className='flex items-center gap-2 text-sm opacity-50'>
					<IoCalendar />
					{dateFormat(note.createdAt)}
				</span>
				{!note.isActual && <Badge variant={'destructive'}>Неактуально</Badge>}
			</CardFooter>
		</Card>
	)
}
