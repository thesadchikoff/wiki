export type Note = {
	title: string
	content: string
	categoriesId: string
}

export type ResponseNote = {
	id: string
	createdAt: string
	updatedAt: string
	author: User
} & Note
