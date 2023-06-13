import { useState } from 'react'

import Header from '@/components/layout/header/Header'
import Modal from '@/components/ui/modal/Modal'

const Home = () => {
	const [isModal, setIsModal] = useState(false)

	const showModal = () => setIsModal(true)
	const closeModal = () => setIsModal(false)

	return (
		<>
			{isModal && <Modal closeModal={closeModal} heading='Create post' />}
			<div className='container'>
				<Header />
				Home
				<button onClick={showModal}>Create post</button>
			</div>
		</>
	)
}

export default Home
