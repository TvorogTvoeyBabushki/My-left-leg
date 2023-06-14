import { useModal } from '@/hooks/useModal'

import Modal from '@/components/ui/modal/Modal'

import Header from '@/components/layout/header/Header'

const Home = () => {
	const { isModal, showModal, closeModal } = useModal()

	return (
		<>
			{isModal && <Modal closeModal={closeModal} />}
			<div className='container'>
				<Header />
				Home
				<button onClick={showModal}>Create post</button>
			</div>
		</>
	)
}

export default Home
