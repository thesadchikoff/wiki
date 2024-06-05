import { BACKEND_ENDPOINTS } from '@/api/endpoints'
import { api } from '@/api/instanse'

class DocService {
	async create(file: FormData) {
		const { data } = await api.post(BACKEND_ENDPOINTS.DOCS, file)
		return data
	}
	async getAll() {
		const { data } = await api.get<Doc[]>(BACKEND_ENDPOINTS.DOCS)
		return data
	}
	async getOne(id: any) {
		console.log(id)
		const { data } = await api.get<Doc>(BACKEND_ENDPOINTS.DOCS + '/' + id)
		return data
	}
}

export default new DocService()
