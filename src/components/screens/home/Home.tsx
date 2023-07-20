import { useQuery } from '@tanstack/react-query'

import { useModal } from '@/hooks/useModal'

import Modal from '@/components/ui/modal/Modal'
import Post from '@/components/ui/post/Post'

import Layout from '@/components/layout/Layout'
import PostService, { IDataService } from '@/services/post/post.service'

const Home = () => {
	const { isModal, closeModal } = useModal()

	const { data, isSuccess } = useQuery(
		['get post'],
		() => PostService.getPostAll(),
		{
			select: ({ data }) => data as IDataService[]
		}
	)

	return (
		<>
			{isModal && <Modal closeModal={closeModal} />}
			<Layout>
				<section>
					<div className='container'>{isSuccess && <Post data={data} />}</div>
				</section>
			</Layout>
		</>
	)
}

export default Home
