import { BACKEND_ENDPOINTS } from '@/api/endpoints'
import { api } from '@/api/instanse'

export default new (class NotesService {
	async createNote(newNote: Note) {
		const { data } = await api.post(BACKEND_ENDPOINTS.CREATE_NOTE, newNote)
		return data
	}

	async searchNotes(searchData: {
		searchValue: string
		categoriesId: string
		page?: number
	}) {
		const { data } = await api.post(
			BACKEND_ENDPOINTS.SEARCH_NOTES +
				searchData.categoriesId +
				'/' +
				searchData.page,
			searchData
		)
		return data
	}

	async getNotes(categoriesId: string) {
		console.log(categoriesId)
		const { data } = await api.get(
			BACKEND_ENDPOINTS.GET_NOTES + '/' + categoriesId
		)
		return data
	}

	async getOneNote(id: string) {
		console.log(id)
		const { data } = await api.get(BACKEND_ENDPOINTS.GET_NOTE + id)
		return data
	}
	async updateNote(noteId: string, noteDataForUpdate: { content: string }) {
		console.log(noteDataForUpdate)
		const { data } = await api.patch(
			BACKEND_ENDPOINTS.UPDATE_NOTE + noteId,
			noteDataForUpdate
		)
		return data
	}
	async deleteNote(noteId: string) {
		return api.delete(BACKEND_ENDPOINTS.DELETE_NOTE + noteId)
	}

	async toggleActualNote(noteId: string) {
		const { data } = await api.patch(
			BACKEND_ENDPOINTS.TOGGLE_ACTUAL_NOTE + noteId
		)
		return data
	}
})()
