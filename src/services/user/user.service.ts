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

	async toggleEmailNotification() {
		const { data } = await api.get(BACKEND_ENDPOINTS.TOGGLE_EMAIL_NOTIFICATION)
		return data
	}

	async connectTelegramNotify(dataRequest: { telegramId: string }) {
		const { data } = await api.post(
			BACKEND_ENDPOINTS.CONNECT_TELEGRAM_NOTIFY,
			dataRequest
		)
		return data
	}

	async changePassword(changePasswordData: {
		oldPassword: string
		newPassword: string
	}) {
		const { data } = await api.post(
			BACKEND_ENDPOINTS.CHANGE_USER_PASSWORD,
			changePasswordData
		)
		return data
	}

	async disconnectTelegramNotify() {
		const { data } = await api.delete(
			BACKEND_ENDPOINTS.DISCONNECT_TELEGRAM_NOTIFY
		)
		return data
	}

	async toggleTelegramNotify() {
		const { data } = await api.get(BACKEND_ENDPOINTS.TOGGLE_TELEGRAM_NOTIFY)
		return data
	}

	logout() {
		localStorage.removeItem('accessToken')
	}
}

export default new UserService()
