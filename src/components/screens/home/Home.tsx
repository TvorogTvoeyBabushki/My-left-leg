import { useEffect, useState } from 'react'

import { useModal } from '@/hooks/useModal'
import { usePost } from '@/hooks/usePost'
import { useSearchDataPost } from '@/hooks/useSearchDataPost'

import Loader from '@/components/ui/loader/Loader'
import Modal from '@/components/ui/modal/Modal'
import Post from '@/components/ui/post/Post'

import Layout from '@/components/layout/Layout'
import { getTitle } from '@/config/seo/seo.config'
import PostService, { IDataService } from '@/services/post/post.service'

const Home = () => {
	const { isInteractionPost, setIsInteractionPost, postId } = usePost()
	const { isModal, closeModal } = useModal()
	const [data, setData] = useState<IDataService[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const { searchDataPost, setGetDataPost } = useSearchDataPost()
	const fetchPosts = async () => {
		try {
			setIsLoading(true)
			const response = await PostService.getPostAll()

			setData(response.data)
			setGetDataPost(response.data)
		} catch (error) {
			console.log('error: ', error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		setIsLoading(false)
	}, [])

	useEffect(() => {
		fetchPosts()

		getTitle('home')

		return () => setIsInteractionPost(false)
	}, [isInteractionPost])

	useEffect(() => {
		setData(searchDataPost!)
	}, [searchDataPost])

	return (
		<>
			{isModal && (
				<Modal
					closeModal={closeModal}
					setIsInteractionPost={setIsInteractionPost}
				/>
			)}

			<Layout type='home'>
				<section>
					<div className='container'>
						{isLoading && !postId ? (
							<Loader type='home' />
						) : (
							<Post data={data as IDataService[]} />
						)}
					</div>
				</section>
			</Layout>
		</>
	)
}

export default Home
