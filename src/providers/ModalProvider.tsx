import { createContext, useState } from 'react'

interface IModalProviderProps {
	children: JSX.Element
}

export interface ModalContextType {
	isPublishPost: boolean
	setIsPublishPost: (isPublishPost: boolean) => void
	isModal: boolean
	setIsModal: (isModal: boolean) => void
	showModal: () => void
	closeModal: () => void
}

export const ModalContext = createContext<ModalContextType | null>(null)

const ModalProvider = ({ children }: IModalProviderProps) => {
	const [isPublishPost, setIsPublishPost] = useState(false)
	const [isModal, setIsModal] = useState(false)
	const showModal = () => setIsModal(true)
	const closeModal = () => setIsModal(false)

	return (
		<ModalContext.Provider
			value={{
				isPublishPost,
				setIsPublishPost,
				isModal,
				setIsModal,
				showModal,
				closeModal
			}}
		>
			{children}
		</ModalContext.Provider>
	)
}

export default ModalProvider
