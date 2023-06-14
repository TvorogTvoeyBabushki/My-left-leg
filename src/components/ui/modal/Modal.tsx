import { useRef, useState } from 'react'
import { BsPatchPlus } from 'react-icons/bs'
import TextareaAutosize from 'react-textarea-autosize'

import Button from '../button/Button'
import Field from '../field/Field'

import styles from './Modal.module.scss'

interface IModalProps {
	closeModal: () => void
}

const Modal = ({ closeModal }: IModalProps) => {
	const [previewImage, setPreviewImage] = useState('')

	const imageRef = useRef<HTMLImageElement>(null)
	const iconRef = useRef<HTMLDivElement>(null)
	const divElement = iconRef.current

	const getImage = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files: FileList | null = event.target.files

		if (files) {
			const fileRef = files[0] || ''
			const reader = new FileReader()

			reader.readAsDataURL(fileRef) // получаем url
			reader.onload = (ev: any) => {
				setPreviewImage(ev.target.result)
			}
		}

		const imageElement = imageRef.current
		const divElement = iconRef.current

		if (imageElement && divElement) {
			imageElement.style.visibility = 'visible'
			divElement.style.visibility = 'hidden'
		}
	}

	const showIcon = () => {
		if (divElement) divElement.style.visibility = 'visible'
	}

	const closeIcon = () => {
		if (divElement) divElement.style.visibility = 'hidden'
	}

	return (
		<>
			<div className={styles.modal} onClick={closeModal}></div>

			<div className={styles.wrapper}>
				<form className={styles.form}>
					<div
						className={styles.frame}
						onMouseOver={showIcon}
						onMouseOut={closeIcon}
					>
						<img
							ref={imageRef}
							src={previewImage}
							alt='image-post'
							draggable={false}
						/>

						<Field
							className='field-image'
							type='file'
							name='image'
							accept='image/*'
							onChange={getImage}
							onMouseOver={showIcon}
						/>

						<div ref={iconRef}>
							<BsPatchPlus className='get-icon-img' fontSize='34' />
						</div>
					</div>
					<div>
						<Field
							className={styles.field}
							name='title'
							type='text'
							placeholder='Post title...'
						/>
						<TextareaAutosize
							placeholder='Post description...'
							name='description'
							maxLength={200}
							className='text-area'
						/>

						<Button onClick={event => event.preventDefault()}>
							Create post
						</Button>
					</div>
				</form>
			</div>
		</>
	)
}

export default Modal
