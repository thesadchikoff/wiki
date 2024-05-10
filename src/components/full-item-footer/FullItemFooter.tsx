import { QUERIES } from '@/constants/query.constants'
import { useUser } from '@/context'
import notesService from '@/services/notes/notes.service'
import { cn } from '@/utils/classnames'
import { dateFormat } from '@/utils/dateFormat'
import { isEdited } from '@/utils/isEdited'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CalendarDaysIcon } from 'lucide-react'
import { FaArrowAltCircleUp } from 'react-icons/fa'
import { IoCalendar } from 'react-icons/io5'
import { MdModeEdit } from 'react-icons/md'
import { toast } from 'sonner'
import RenderUserBadge from '../forms/auth/components/render-user-badge/RenderUserBadge'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'

const FullItemFooter = ({ ...data }: ResponseNote) => {
	const { user } = useUser()
	const isUseful = data.User.find(data => data.id === user!.id)
	const queryClient = useQueryClient()
	const usefulMutation = useMutation({
		mutationKey: [QUERIES.USEFUL_NOTE],
		mutationFn: isUseful ? notesService.disUsefulNote : notesService.usefulNote,
		onSuccess(data) {
			queryClient.invalidateQueries({ queryKey: [QUERIES.GET_NOTE] })
			toast.success(data.message.title, {
				description: data.message.description,
			})
		},
		onError(error) {
			toast.error(
				// @ts-ignore
				error?.response?.data ? error.response.data.message : error.message
			)
		},
	})
	return (
		<div className='flex flex-col items-start justify-between w-full gap-5 px-5 py-3 text-xs bg-white rounded lg:items-center dark:bg-foreground lg:item-center lg:flex-row'>
			<div className='flex flex-col items-center gap-5 text-lg lg:items-center lg:flex-row'>
				<span className='flex items-center gap-2 '>
					<HoverCard>
						<HoverCardTrigger asChild>
							<article className='flex items-center gap-2 text-xs opacity-50'>
								Опубликовал{' '}
								<article className='underline cursor-pointer'>
									{data.author?.email}
								</article>
							</article>
						</HoverCardTrigger>
						<HoverCardContent className='w-80'>
							<div className='flex justify-between space-x-4'>
								<div className='space-y-1'>
									<h4 className='text-sm font-semibold'>
										{data.author?.email}
									</h4>
									<p className='text-sm'>
										<RenderUserBadge {...data.author} />
									</p>
									<div className='flex items-center pt-2'>
										<CalendarDaysIcon className='w-4 h-4 mr-2 opacity-70' />{' '}
										<span className='text-xs text-muted-foreground '>
											Зарегистрирован {dateFormat(data.author.createdAt)}
										</span>
									</div>
								</div>
							</div>
						</HoverCardContent>
					</HoverCard>
				</span>
			</div>
			<div className='flex items-center justify-between w-full gap-5 lg:justify-end lg:items-center'>
				<span className='flex items-center gap-2 text-xs opacity-50'>
					{isEdited(data) ? (
						<MdModeEdit className='hidden lg:block' />
					) : (
						<IoCalendar className='hidden lg:block' />
					)}
					{isEdited(data) ? ' Отредактировано' : ' Опубликовано'}{' '}
					{dateFormat(isEdited(data) ? data.updatedAt : data.createdAt)}
				</span>
				<button
					onClick={() => usefulMutation.mutate(data.id)}
					className={cn(
						'flex items-center gap-2 px-4 py-2 text-brand border border-transparent transition-all duration-150 rounded-full bg-brand/20 hover:border-brand',
						[
							{
								'bg-brand shadow-lg shadow-brand/20 text-white': Boolean(
									data.User.find(data => data.id === user!.id)
								),
							},
						]
					)}
				>
					<FaArrowAltCircleUp size={14} />
					<span className='font-semibold'>{data._count.User}</span>
				</button>
			</div>
		</div>
	)
}

export default FullItemFooter
