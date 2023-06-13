import { useState } from 'react'
import { BsPatchPlus } from 'react-icons/bs'

import Field from '../field/Field'

import styles from './Modal.module.scss'

interface IModalProps {
	heading: string
	closeModal: () => void
}

const Modal = ({ heading, closeModal }: IModalProps) => {
	const [previewImage, setPreviewImage] = useState('')

	const getImage = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files: FileList | null = event.target.files
		console.log(files)
		if (files) {
			const fileRef = files[0] || ''
			const reader = new FileReader()

			reader.readAsDataURL(fileRef) // получаем url
			reader.onload = (ev: any) => {
				setPreviewImage(ev.target.result)
			}
		}
	}

	return (
		<>
			<div className={styles.modal} onClick={closeModal}></div>
			<form className={styles.form}>
				<h1 style={{ textAlign: 'center' }}>{heading}</h1>
				<div className={styles.frame}>
					<Field
						type='file'
						name='image'
						accept='image/*'
						onChange={getImage}
					/>

					<BsPatchPlus className='get-icon-img' fontSize='34' />
				</div>

				<img src={previewImage} alt='' />
			</form>
		</>
	)
}

export default Modal
