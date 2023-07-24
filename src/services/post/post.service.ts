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

	async getPost(id: number) {
		return $axios.get(`${POST}/${id}`)
	}

	async create(body: IDataService) {
		// если будут опять проблемы, то делаем {} body
		return $axios.post(POST, body)
	}

	async update(body: IDataService, id: number) {
		return $axios.put(`${POST}/${id}`, body)
	}

	async delete(id: number) {
		return $axios.delete(`${POST}/${id}`)
	}
}

export default new PostService()
