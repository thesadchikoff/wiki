import { BACKEND_ENDPOINTS } from '@/api/endpoints'
import { api } from '@/api/instanse'

export default new (class CategoryService {
	async getAllCategories() {
		const { data } = await api.get(BACKEND_ENDPOINTS.CATEGORIES)
		return data
	}

	async getOne(categoryId: string) {
		const { data } = await api.get(BACKEND_ENDPOINTS.GET_CATEGORY + categoryId)
		return data
	}

	async createCategory(categoryData: any) {
		const { data } = await api.post(
			BACKEND_ENDPOINTS.ADD_CATEGORIES,
			categoryData
		)
		return data
	}
})()
