import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsPatchPlus } from 'react-icons/bs'
import TextareaAutosize from 'react-textarea-autosize'

import { usePost } from '@/hooks/usePost'

import Button from '../button/Button'
import Field from '../field/Field'
import Loader from '../loader/Loader'

import styles from './Modal.module.scss'
import PostService, { IDataService } from '@/services/post/post.service'
import { cloudName } from '@/utils/cloudinary/cloudName.util'
import { uploadPreset } from '@/utils/cloudinary/uploadPreset.util'

interface IModalProps {
	closeModal: () => void
	setIsInteractionPost: (isInteractionPost: boolean) => void
}

export interface IData {
	title: string
	description: string
	img: any
}

const Modal = ({ closeModal, setIsInteractionPost }: IModalProps) => {
	const { post, setPost } = usePost()
	const [isChangePost, setIsChangePost] = useState(true)
	const [previewImage, setPreviewImage] = useState('')
	const [fieldValue, setFieldValue] = useState('')
	const [textareaValue, setTextareaValue] = useState('')
	const [postId, setPostId] = useState(0)

	const imageRef = useRef<HTMLImageElement>(null)
	const iconRef = useRef<HTMLDivElement>(null)
	const divElement = iconRef.current // повторение
	const imageElement = imageRef.current // повторение

	const [url, setUrl] = useState<any>('')
	const [image, setImage] = useState<any>('')
	const [isUrlLoading, setIsUrlLoading] = useState(false)

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

		const divElement = iconRef.current
		const imageElement = imageRef.current

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
		(body: IDataService) =>
			!isChangePost
				? PostService.update(body, postId)
				: PostService.create(body),
		{
			onSuccess: () => {
				closeModal()
				reset()
				setIsInteractionPost(true)
			}
		}
	)

	const uploadImage = async () => {
		if (image) {
			try {
				setIsUrlLoading(true)

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
			} finally {
				setIsUrlLoading(false)
			}
		}
	}

	const changeFieldAndTextarea = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		type: string
	) => {
		const targetValue = e.target.value

		if (type === 'field')
			targetValue.trim() ? setFieldValue(targetValue) : setFieldValue('')

		if (type === 'textarea')
			targetValue.trim() ? setTextareaValue(targetValue) : setTextareaValue('')
	}

	useEffect(() => {
		uploadImage()

		return () => {
			setUrl('')
		}
	}, [image])

	useEffect(() => {
		if (post && isChangePost) {
			setPreviewImage(post.img)
			setFieldValue(post.title)
			setTextareaValue(post.description)
			setPostId(post.id as number)
			setUrl(post.img)

			setIsChangePost(false)
		}

		imageElement && imageElement?.classList.add(styles.active)

		return () => {
			setPost(null)
		}
	}, [isChangePost])

	const onSubmit = (data: IData) => {
		if (!url && isUrlLoading) {
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
					<div>
						<div>
							<Field
								register={register}
								name='title'
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									changeFieldAndTextarea(e, 'field')
								}
								value={fieldValue}
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
								onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
									changeFieldAndTextarea(e, 'textarea')
								}
								value={textareaValue}
							/>
						</div>

						<div>
							<Button type='modal' isLoading={isUrlLoading}>
								{!isChangePost ? 'Update post' : 'Create post'}
							</Button>
						</div>
					</div>

					{isUrlLoading && <Loader />}
				</form>
			</div>
		</>
	)
}

export default Modal
