type Doc = {
	id: string
	fileName: string
	fileUrl: string
	isVisible: boolean
	size: number
	userId: string
	author: Pick<User, 'id' | 'email'>
}
