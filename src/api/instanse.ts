/* eslint-disable no-param-reassign */
import axios from 'axios'

import { userConstants } from '@/constants/user.constants'

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem(
		userConstants.ACCESS_TOKEN
	)}`
	return config
})
