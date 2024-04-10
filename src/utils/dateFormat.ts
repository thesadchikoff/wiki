export const dateFormat = (date: string) => {
	const toDate = new Date(date)
	try {
		const formatter = new Intl.DateTimeFormat('ru', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		})
		return formatter.format(toDate)
	} catch (e) {
		console.error(e)
		return 'Не  определена'
	}
}
