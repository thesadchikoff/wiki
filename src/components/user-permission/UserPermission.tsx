import { useUser } from '@/context'
import { AdminButton } from '../system-buttons/AdminButton'
import { ModeratorButton } from '../system-buttons/ModeratorButton'

export const UserPermission = () => {
	const { user } = useUser()
	return (
		<div className='fixed z-50 flex flex-col gap-5 bottom-5 right-5'>
			{user?.moderatedContent?.length ? <ModeratorButton /> : null}
			{user?.isAdmin ? <AdminButton /> : null}
		</div>
	)
}
