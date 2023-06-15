import { serverUrl } from '@/utils/serverUrl.utils'

const API_URL = `${serverUrl}/api`

export const app = async () => {
	const response = await fetch(`${API_URL}/post`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			title: 'title',
			description: 'description',
			img: 'img'
		})
	})

	const data = await response.json()
	console.log(data)
}
