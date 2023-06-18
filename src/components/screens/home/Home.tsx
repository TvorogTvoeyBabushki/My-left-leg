import { useQuery } from '@tanstack/react-query'

import { useModal } from '@/hooks/useModal'

import Modal from '@/components/ui/modal/Modal'
import Post from '@/components/ui/post/Post'

import Header from '@/components/layout/header/Header'
import PostService from '@/services/post/post.service'

const Home = () => {
	const { isModal, showModal, closeModal } = useModal()

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
			<div className='container'>
				<Header />
				Home
				<button onClick={showModal}>Create post</button>
				{isSuccess && <Post data={data} type='odd' />}
			</div>
		</>
	)
}

export default Home
