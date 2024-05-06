import { BACKEND_ENDPOINTS } from '@/api/endpoints'
import { api } from '@/api/instanse'

class UserService {
	async signIn(authData: AuthData) {
		const { data } = await api.post<AuthResponse>(
			BACKEND_ENDPOINTS.SIGN_IN,
			authData
		)
		localStorage.setItem('accessToken', data.accessToken)
		return data
	}
	async signUp(authData: AuthData) {
		const { data } = await api.post<AuthResponse>(
			BACKEND_ENDPOINTS.VERIFY,
			authData
		)
		return data
	}

	async verifyCheck(code: string) {
		const { data } = await api.get(BACKEND_ENDPOINTS.VERIFY_CHECK + code)
		return data
	}
	async getProfile() {
		const { data } = await api.get(BACKEND_ENDPOINTS.PROFILE)
		return data
	}

	logout() {
		localStorage.removeItem('accessToken')
	}
}

export default new UserService()
