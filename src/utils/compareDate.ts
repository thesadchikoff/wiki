export const compareDate = (createdAt: string) => {
	const createdDate = new Date(createdAt)
	const currentDate = new Date()
	createdDate.setDate(createdDate.getDate() + 5)
	if (currentDate > createdDate) {
		return false
	} else if (currentDate < createdDate) {
		return true
	} else {
		return false
	}
}
