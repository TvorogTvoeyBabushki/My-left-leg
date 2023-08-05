import styles from './Modal.module.scss'
import ModalForm from './modal-form/ModalForm'

export interface IModalProps {
	closeModal: () => void
	setIsInteractionPost: (isInteractionPost: boolean) => void
	styles?: CSSModuleClasses
}

export interface ICategorys {
	value: string
	label?: string
}

export interface IData {
	title: string
	description: string
	img: string
	categorysIds?: ICategorys[] | string[]
}

const Modal = ({ closeModal, setIsInteractionPost }: IModalProps) => {
	return (
		<>
			<div className={styles.modal} onClick={closeModal}></div>

			<div className={styles.wrapper}>
				<ModalForm
					closeModal={closeModal}
					setIsInteractionPost={setIsInteractionPost}
					styles={styles}
				/>
			</div>
		</>
	)
}

export default Modal
