import { createContext, useState } from 'react'

import { IDataService } from '@/services/post/post.service'

interface IModalProviderProps {
	children: JSX.Element
}

export interface IModalContextType {
	isModal: boolean
	setIsModal: (isModal: boolean) => void
	showModal: () => void
	closeModal: () => void
}

export const ModalContext = createContext<IModalContextType | null>(null)

const ModalProvider = ({ children }: IModalProviderProps) => {
	const [isModal, setIsModal] = useState(false)
	const showModal = () => setIsModal(true)
	const closeModal = () => setIsModal(false)

	return (
		<ModalContext.Provider
			value={{
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
