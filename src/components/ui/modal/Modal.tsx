import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsPatchPlus } from 'react-icons/bs'
import TextareaAutosize from 'react-textarea-autosize'

import Button from '../button/Button'
import Field from '../field/Field'

import styles from './Modal.module.scss'
import PostService, { IDataService } from '@/services/post/post.service'
import { cloudName } from '@/utils/cloudinary/cloudName.util'
import { uploadPreset } from '@/utils/cloudinary/uploadPreset.util'

interface IModalProps {
	closeModal: () => void
}

const Modal = ({ closeModal }: IModalProps) => {
	const [previewImage, setPreviewImage] = useState('')

	const imageRef = useRef<HTMLImageElement>(null)
	const iconRef = useRef<HTMLDivElement>(null)
	const divElement = iconRef.current

	const [url, setUrl] = useState<any>('')
	const [image, setImage] = useState<any>('')

	const getImage = (event: any) => {
		const fileRef: File | null = event.target.files[0]

		if (fileRef) {
			setImage(fileRef)

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

	const { handleSubmit, register, reset } = useForm<IData>({
		mode: 'onChange'
	})

	const { mutate } = useMutation(
		['create post'],
		(body: IDataService) => PostService.create(body),
		{
			onSuccess: () => {
				alert('success')
				closeModal()
				reset()
			}
		}
	)

	interface IData {
		title: string
		description: string
		img: any
	}

	const uploadImage = async () => {
		try {
			const formData = new FormData()
			formData.append('file', image)
			formData.append('upload_preset', uploadPreset)
			formData.append('cloud_name', cloudName)
			const response = await axios.post(
				`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
				formData
			)

			setUrl(response.data.url)
		} catch (error) {
			console.log('error: ', error)
		}
	}

	useEffect(() => {
		if (!url) {
			uploadImage()
		}

		console.log(url)
		return () => {
			setUrl('')
		}
	}, [image])

	const onSubmit = (data: IData) => {
		if (!url) {
			console.log('увы')
			return
		}

		data = { ...data, img: url }
		mutate(data)
	}

	return (
		<>
			<div className={styles.modal} onClick={closeModal}></div>

			<div className={styles.wrapper}>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
							register={register}
							name='img'
							type='file'
							accept='image/*'
							onChange={getImage}
							onMouseOver={showIcon}
							className='field-image'
						/>

						<div ref={iconRef}>
							<BsPatchPlus className='get-icon-img' fontSize='34' />
						</div>
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between'
						}}
					>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								height: '370px'
							}}
						>
							<Field
								register={register}
								name='title'
								type='text'
								placeholder='Post title...'
								className={styles.field}
							/>
							<TextareaAutosize
								{...register('description', { required: 'required' })}
								placeholder='Post description...'
								name='description'
								maxLength={200}
								className='text-area'
							/>
						</div>

						<div>
							<Button type='modal'>Create post</Button>
						</div>
					</div>
				</form>
			</div>
		</>
	)
}

export default Modal
