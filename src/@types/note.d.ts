type Note = {
	title: string
	content: string
	categoriesId: string
	oldContent: string
	isEdited: boolean
	isPinned: boolean
	User: {
		id: string
	}[]
	isActual: boolean
	_count: {
		User: number
	}
}

type ResponseNote = {
	id: string
	createdAt: string
	updatedAt: string
	author: User
	categories: CategoryResponse
} & Note
