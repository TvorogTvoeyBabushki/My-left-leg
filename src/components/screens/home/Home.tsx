import { useQuery } from '@tanstack/react-query'

import { useModal } from '@/hooks/useModal'

import Modal from '@/components/ui/modal/Modal'
import Post from '@/components/ui/post/Post'

import Layout from '@/components/layout/Layout'
import Header from '@/components/layout/header/Header'
import PostService from '@/services/post/post.service'

const Home = () => {
	const { isModal, closeModal } = useModal()

	const { data, isSuccess } = useQuery(
		['get post'],
		() => PostService.getPostAll(),
		{
			select: ({ data }) => data
		}
	)

	return (
		<>
			{isModal && <Modal closeModal={closeModal} />}
			<Layout>
				<div className='container'>{isSuccess && <Post data={data} />}</div>
			</Layout>
		</>
	)
}

export default Home
