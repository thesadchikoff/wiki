import { AuthServerError } from '@/@types/api'
import { QUERIES } from '@/constants/query.constants'
import { useUser } from '@/context'
import userService from '@/services/user/user.service'
import { useMutation } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const useSignUp = () => {
	const { setUser } = useUser()
	const navigate = useNavigate()
	const location = useLocation()
	const { from } = location.state || { from: { pathname: '/' } }
	return useMutation<AuthResponse, AuthServerError, AuthData>({
		mutationFn: userService.signUp,
		mutationKey: [QUERIES.SIGN_UP],
		onSuccess(data) {
			setUser(data.user)
			navigate(from)
			toast.success('Продолжение регистрации', {
				description: `Для завершения регистрации проверьте письмо на почте`,
			})
		},
		onError(error) {
			console.log(error)
			toast.error('Error', {
				description: error.response.data.message,
			})
		},
	})
}
