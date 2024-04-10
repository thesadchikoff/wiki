export function declineTool(number: number): string {
	if (number % 10 === 1 && number % 100 !== 11) {
		return 'статья'
	} else if (
		number % 10 >= 2 &&
		number % 10 <= 4 &&
		(number % 100 < 10 || number % 100 >= 20)
	) {
		return 'статьи'
	} else {
		return 'статей'
	}
}
