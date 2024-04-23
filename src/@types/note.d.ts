type Note = {
	title: string
	content: string
	categoriesId: string
	oldContent: string
	isEdited: boolean
	isActual: boolean
}

type ResponseNote = {
	id: string
	createdAt: string
	updatedAt: string
	author: User
	categories: CategoryResponse
} & Note
