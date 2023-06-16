import { $axios } from '../api'

export interface IDataService {
	id?: number
	title: string
	description: string
	img: string
}

export const POST = '/post'

class PostService {
	async getPostAll() {
		return $axios.get(POST)
	}

	async create(body: IDataService) {
		// если будут опять проблемы, то делаем {} body
		return $axios.post(POST, body)
	}
}

export default new PostService()
