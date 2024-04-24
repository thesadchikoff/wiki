const serializeFormQuery = (value: number | string = 0) => {
	return {
		page: value,
	}
}

export default serializeFormQuery
