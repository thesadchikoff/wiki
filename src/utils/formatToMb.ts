export function formatBytesToMB(bytes: number): string {
	if (bytes < 0) {
		throw new Error('Bytes must be non-negative.')
	}

	const megabytes = bytes / (1024 * 1024) // Деление на 1024^2 для перевода в мегабайты

	if (megabytes < 1) {
		return `${bytes} B`
	} else if (megabytes < 10) {
		return `${megabytes.toFixed(2)} MB`
	} else {
		return `${megabytes.toFixed(1)} MB`
	}
}
