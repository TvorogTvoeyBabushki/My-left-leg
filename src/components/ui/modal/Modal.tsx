import { useMutation } from '@tanstack/react-query'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import TextareaAutosize from 'react-textarea-autosize'

import { useImageField } from '@/hooks/useImageField'
import { usePost } from '@/hooks/usePost'
import { useUploadImage } from '@/hooks/useUploadImage'

import Button from '../button/Button'
import Field from '../field/Field'
import ImageField from '../field/image-field/ImageField'

import styles from './Modal.module.scss'
import { selectOptions } from '@/constants/selectOptions'
import PostService, { IDataService } from '@/services/post/post.service'

interface IModalProps {
	closeModal: () => void
	setIsInteractionPost: (isInteractionPost: boolean) => void
}

interface ICategorys {
	value: string
	label?: string
}

export interface IData {
	title: string
	description: string
	img: any
	categorysIds?: ICategorys[] | string[]
}

const Modal = ({ closeModal, setIsInteractionPost }: IModalProps) => {
	const { setIsToggleIcon, setIsToggleImage } = useImageField()
	const { post, setPost } = usePost()
	const [isChangePost, setIsChangePost] = useState(true)
	const [previewImage, setPreviewImage] = useState('')
	const [fieldValue, setFieldValue] = useState('')
	const [textareaValue, setTextareaValue] = useState('')
	const [postId, setPostId] = useState(0)
	const [categorys, setCategorys] = useState<ICategorys[]>([])

	const [image, setImage] = useState<any>('')
	const [url, setUrl] = useState<any>('')
	const [isUrlLoading, setIsUrlLoading] = useState(false)

	const {
		handleSubmit,
		register,
		reset,
		control,
		formState: { errors }
	} = useForm<IData>({
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
		useUploadImage({ image, setUrl, setIsUrlLoading })

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

			const categorys = selectOptions.filter(selectOption => {
				for (const selectValue of post.categorysIds) {
					if (selectOption.value === selectValue) {
						return selectOption
					}
				}
			})

			setCategorys(categorys)
			setIsChangePost(false)
			setIsToggleImage(true)
		}

		return () => {
			setPost(null)
		}
	}, [isChangePost])

	const onSubmit = (data: IData) => {
		if (!url) {
			return
		}

		if (!data.title || !data.description) {
			data.title = fieldValue
			data.description = textareaValue
		}

		if (!data.categorysIds) {
			data.categorysIds = categorys
		}

		const categorysIds = data.categorysIds.map(category => {
			const valueCategory = category as ICategorys

			return valueCategory.value
		})

		data = {
			...data,
			img: url,
			categorysIds
		}

		mutate(data as IDataService)
	}

	return (
		<>
			<div className={styles.modal} onClick={closeModal}></div>

			<div className={styles.wrapper}>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<ImageField
						type='post'
						errors={errors}
						previewImage={previewImage}
						register={register}
						setImage={setImage}
						setPreviewImage={setPreviewImage}
						isUrlLoading={isUrlLoading}
					/>

					<div>
						<div>
							<Field
								register={register}
								name='title'
								options={{
									required: fieldValue.trim().length ? '' : 'Title is required'
								}}
								error={errors.title?.message as string}
								onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
									changeFieldAndTextarea(e, 'field')
								}
								value={fieldValue}
								type='text'
								placeholder='Post title...'
								className={styles.field}
							/>

							<>
								{errors.description && (
									<div
										style={{
											margin: '10px 0',
											textAlign: 'center',
											color: 'red'
										}}
									>
										{errors.description.message}
									</div>
								)}
								<TextareaAutosize
									{...register('description', {
										required: textareaValue ? false : 'Description is required'
									})}
									placeholder='Post description...'
									name='description'
									maxLength={200}
									className={clsx('text-area', {
										['text-area--error']: !!errors.description
									})}
									onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
										changeFieldAndTextarea(e, 'textarea')
									}
									value={textareaValue}
								/>
							</>

							<Controller
								name='categorysIds'
								control={control}
								render={({ field: { value = categorys, onChange } }) => (
									<Select
										required
										classNamePrefix='select'
										placeholder='Categorys...'
										options={selectOptions.filter(
											selectOption => selectOption.value !== 'all'
										)}
										onChange={onChange}
										value={value as ICategorys[]}
										isMulti
									/>
								)}
							/>
						</div>

						<div>
							<Button type='modal' isLoading={isUrlLoading}>
								{!isChangePost ? 'Update post' : 'Create post'}
							</Button>
						</div>
					</div>
				</form>
			</div>
		</>
	)
}

export default Modal
