import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { useModal } from '@/hooks/useModal'

import Modal from '@/components/ui/modal/Modal'
import Post from '@/components/ui/post/Post'

import Layout from '@/components/layout/Layout'
import PostService, { IDataService } from '@/services/post/post.service'

const Home = () => {
	const { isModal, closeModal, isInteractionPost, setIsInteractionPost } =
		useModal()
	const [data, setData] = useState<IDataService[]>([])

	const { isSuccess, isLoading } = useQuery(['get posts'], () =>
		PostService.getPostAll()
	)

	const fetchPosts = async () => {
		const response = await PostService.getPostAll()

		setData(response.data)
	}

	useEffect(() => {
		fetchPosts()

		return () => setIsInteractionPost(false)
	}, [isInteractionPost])

	return (
		<>
			{isModal && (
				<Modal
					closeModal={closeModal}
					setIsInteractionPost={setIsInteractionPost}
				/>
			)}
			<Layout>
				<section>
					<div className='container'>
						{isLoading && <div style={{ textAlign: 'center' }}>Loading...</div>}
						{isSuccess && <Post data={data as IDataService[]} />}
					</div>
				</section>
			</Layout>
		</>
	)
}

export default Home
