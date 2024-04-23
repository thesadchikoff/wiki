import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { ROUTES } from '@/router/routes'
import { dateFormat } from '@/utils/dateFormat'
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
			className='overflow-hidden cursor-pointer'
			onClick={() => navigate(ROUTES.CATEGORY + params.id + '/note/' + note.id)}
		>
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
				{note.isActual ? (
					<Badge variant={'secondary'}>Актуально</Badge>
				) : (
					<Badge variant={'destructive'}>Неактуально</Badge>
				)}
			</CardFooter>
		</Card>
	)
}
