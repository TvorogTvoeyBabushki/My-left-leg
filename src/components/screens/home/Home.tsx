import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { useModal } from '@/hooks/useModal'

import Modal from '@/components/ui/modal/Modal'

import Header from '@/components/layout/header/Header'
import PostService, { IDataService } from '@/services/post/post.service'

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
				{isSuccess && (
					<div>
						{data.map((post: IDataService) => (
							<div key={post.id}>
								<p>{post.title}</p>
								<p>{post.description}</p>
								<img src={post.img} alt='' />
							</div>
						))}
					</div>
				)}
			</div>
		</>
	)
}

export default Home
