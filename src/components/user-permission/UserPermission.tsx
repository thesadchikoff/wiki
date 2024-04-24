import { useUser } from '@/context'
import { AdminButton } from '../system-buttons/AdminButton'
import { ModeratorButton } from '../system-buttons/ModeratorButton'

export const UserPermission = () => {
	const { user } = useUser()
	return (
		<div className='fixed z-50 flex flex-col gap-5 bottom-14 right-5'>
			{user?.moderatedContent?.length ? (
				<ModeratorButton
					isMark={
						!!user.moderatedContent.find(category => category._count.notes > 0)
					}
				/>
			) : null}
			{user?.isAdmin ? <AdminButton /> : null}
		</div>
	)
}
