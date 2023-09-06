import { useEffect, useState } from 'react'

import { useModal } from '@/hooks/useModal'
import { usePost } from '@/hooks/usePost'

import Loader from '@/components/ui/loader/Loader'
import Modal from '@/components/ui/modal/Modal'
import Post from '@/components/ui/post/Post'

import styles from './Home.module.scss'
import Layout from '@/components/layout/Layout'
import { getTitle } from '@/config/seo/seo.config'
import PostService, { IDataService } from '@/services/post/post.service'

const Home = () => {
	const [data, setData] = useState<IDataService[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const { isInteractionPost, setIsInteractionPost } = usePost()
	const { isModal, closeModal } = useModal()

	const fetchPosts = async () => {
		try {
			setIsLoading(true)

			const response = await PostService.getPosts()

			setData(response.data)
		} catch (error) {
			console.log('error: ', error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchPosts()
		getTitle('home')

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

			<Layout type='home'>
				<section className={styles.home}>
					<div className='container'>
						{isLoading ? (
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
