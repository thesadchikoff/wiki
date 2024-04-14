type User = {
	id: string
	email: string
	isAdmin: boolean
	moderatedContent: CategoryResponseForUser[]
	createdAt: string
}

type AuthData = {
	email: string
	password: string
}

type AuthResponse = {
	accessToken: string
	user: User
} & { message: string }
