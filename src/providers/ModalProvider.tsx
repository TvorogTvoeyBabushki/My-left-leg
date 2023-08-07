import { FC, createContext, useState } from 'react'

export interface IModalContextType {
	isModal: boolean
	setIsModal: (isModal: boolean) => void
	showModal: () => void
	closeModal: () => void
}

export const ModalContext = createContext<IModalContextType | null>(null)

const ModalProvider: FC<{ children: JSX.Element }> = ({ children }) => {
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
