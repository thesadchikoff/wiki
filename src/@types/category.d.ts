type CategoryData = {
	title: string
}

type CreateCategory = {
	title: string
}

type CategoryResponse = {
	id: string
	angle: number
	bannerColorLeft: string
	bannerColorRight: string
	iconUrl: string
	title: string
	_count: {
		notes: number
	}
	moderators: Omit<User, 'id', 'email'>[]
}
