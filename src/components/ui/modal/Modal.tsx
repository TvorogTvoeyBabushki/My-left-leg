import { useMutation } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsPatchPlus } from 'react-icons/bs'
import TextareaAutosize from 'react-textarea-autosize'

import Button from '../button/Button'
import Field from '../field/Field'

import styles from './Modal.module.scss'
import PostService, { IDataService } from '@/services/post/post.service'

interface IModalProps {
	closeModal: () => void
}

const Modal = ({ closeModal }: IModalProps) => {
	const [previewImage, setPreviewImage] = useState('')

	const imageRef = useRef<HTMLImageElement>(null)
	const iconRef = useRef<HTMLDivElement>(null)
	const divElement = iconRef.current

	const [pathImage, setPathImage] = useState('')
	// const formRef = useRef<HTMLFormElement>(null)

	const getImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const files: FileList | null = event.target.files

		if (files) {
			const fileRef = files[0] || ''
			const reader = new FileReader()
			// const ab: any = await fileRef.arrayBuffer()
			reader.readAsDataURL(fileRef) // получаем url
			reader.onload = (ev: any) => {
				setPreviewImage(ev.target.result)

				setPathImage(ev.target.result)
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
		img: FileList
	}

	const onSubmit = (data: IData) => {
		// const formData = new FormData() as any
		// formData.append('files', data.img[0])
		// data = { ...data, img: data.img[0].name as any }
		// formData.append('post', JSON.stringify(data))

		const files = data.img[0]
		const formData = new FormData()
		formData.append('myFile', files)

		const dataClone = {
			title: data.title,
			description: data.description,
			img: formData
		}
		console.log(data.img[0])
		mutate(dataClone as any)
	}
	// const handlerSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
	// 	event.preventDefault()

	// 	const formData = Object.fromEntries(new FormData(event.target).entries())
	// 	const { title, description, img = pathImage } = formData

	// 	if (title && description && img) {
	// 		// 	app(title, description, img)
	// 		// 	// console.log(title, description, img)

	// 		onSubmit(formData)
	// 		console.log(formData)
	// 	}
	// }

	return (
		<>
			<div className={styles.modal} onClick={closeModal}></div>

			<div className={styles.wrapper}>
				<form
					// ref={formRef}
					onSubmit={handleSubmit(onSubmit)}
					className={styles.form}
				>
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
							<Button>Create post</Button>
						</div>
					</div>
				</form>
			</div>
		</>
	)
}

export default Modal
