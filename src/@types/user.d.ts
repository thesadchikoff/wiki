type User = {
	id: string
	email: string
	isAdmin: boolean
	moderatedContent: CategoryResponseForUser[]
	createdAt: string
	emailNotification: boolean
	telegramNotification: boolean
	TelegramAccount: TelegramAccount
} & Author

type TelegramAccount = {
	id: string
	userId: string
	username: string
	telegramUserId: string
	avatarUrl: string
}

type Author = {
	_count: {
		moderatedContent: number
	}
}

type AuthData = {
	email: string
	password: string
}

type AuthResponse = {
	accessToken: string
	user: User
} & { message: string }
