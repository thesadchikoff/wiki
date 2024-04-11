import { NoteModeratorAction } from '@/@types/mod'
import { BACKEND_ENDPOINTS } from '@/api/endpoints'
import { api } from '@/api/instanse'

export default new (class ModersService {
	async getModeratedCategory() {
		const { data } = await api.get(BACKEND_ENDPOINTS.MOD_CATEGORY)
		return data
	}
	async getNotesForModerate(categoryId: string) {
		const { data } = await api.get(BACKEND_ENDPOINTS.MOD_NOTES + categoryId)
		return data
	}

	async acceptOrDecline(params: NoteModeratorAction) {
		const { data } = await api.post(BACKEND_ENDPOINTS.MOD_ACCEPT_NOTE, params)
		return data
	}
})()
