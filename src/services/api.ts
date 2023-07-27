import axios from 'axios'

import { serverUrl } from '@/config/serverUrl.config'

const API_URL = `${serverUrl}/api`

export const $axios = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})
