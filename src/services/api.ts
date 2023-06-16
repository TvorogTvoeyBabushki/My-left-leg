import axios from 'axios'

import { serverUrl } from '@/utils/serverUrl.utils'

const API_URL = `${serverUrl}/api`

export const $axios = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})
