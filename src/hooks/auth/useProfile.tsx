import { QUERIES } from '@/constants/query.constants'
import { useUser } from '@/context'

import userService from '@/services/user/user.service'
import { UseMutationOptions, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

interface Props {
	options: UseMutationOptions
}
export const useAuthMutation = (options: Props) => {
	const { setUser } = useUser()
	const { data, isSuccess, isError } = useQuery<User>({
		queryKey: [QUERIES.PROFILE],
		queryFn: userService.getProfile,
		...options,
	})
	useEffect(() => {
		if (isSuccess) {
			setUser(data)
		}
		if (isError) {
			setUser(null)
		}
	}, [isError, isSuccess, data])
}
