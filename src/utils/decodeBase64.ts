import { toast } from 'sonner'

export function decodeBase64(base64String: string): string {
	try {
		const decode = atob(base64String)
		return decode
	} catch (error) {
		toast.error('Invalid verify code', {
			// @ts-ignore
			description: error,
		})
		return ''
	}
}
