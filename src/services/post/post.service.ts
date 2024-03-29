import { IDataPost } from '@/components/screens/content-post/ContentPost.interface'

import { $axios } from '../api'

export interface IDataService {
	id?: number
	title: string
	description: string
	img: string & string[]
	categorysIds: string[]
	postContent?: IDataPost[]
	countVisits?: number
}

export const POST = '/post'

class PostService {
	async getPosts() {
		return $axios.get(`${POST}`)
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
