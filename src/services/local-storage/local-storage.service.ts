class LocalStorageService {
	save(key: string, data: string) {
		localStorage.setItem(key, data)
	}

	getData(key: string) {
		return JSON.stringify(localStorage.getItem(key)!)
	}

	removeData(key: string) {
		localStorage.removeItem(key)
	}
}

export default new LocalStorageService()
