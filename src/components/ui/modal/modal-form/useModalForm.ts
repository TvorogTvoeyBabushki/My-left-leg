import { useMutation } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import { useImageField } from '@/hooks/useImageField'
import { usePost } from '@/hooks/usePost'
import { useUploadImage } from '@/hooks/useUploadImage'

import { ICategorys, IData, IModalProps } from '../Modal'

import { selectOptions } from '@/constants/selectOptions'
import PostService, { IDataService } from '@/services/post/post.service'

export const useModalForm = ({
	closeModal,
	setIsInteractionPost
}: IModalProps) => {
	const { setIsToggleImage } = useImageField()
	const { post, setPost } = usePost()

	const [isChangePost, setIsChangePost] = useState(true)
	const [previewImage, setPreviewImage] = useState('')
	const [fieldValue, setFieldValue] = useState('')
	const [textareaValue, setTextareaValue] = useState('')
	const [postId, setPostId] = useState(0)
	const [categorys, setCategorys] = useState<ICategorys[]>([])

	const [image, setImage] = useState<File | null>(null)
	const [url, setUrl] = useState('')
	const [isUrlLoading, setIsUrlLoading] = useState(false)
	const [isUploadImage, setIsUploadImage] = useState(false)

	const {
		handleSubmit,
		register,
		reset,
		control,
		formState: { errors }
	} = useForm<IData | FieldValues>({
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

	// useEffect(() => {
	// 	image &&
	// 		useUploadImage({ image, setUrl, setIsUrlLoading, nameFolder: fieldValue })

	// 	return () => {
	// 		setUrl('')
	// 	}
	// }, [image])

	const handleUploadImage = () => {
		image &&
			useUploadImage({
				image,
				setUrl,
				setIsUrlLoading,
				nameFolder: fieldValue,
				setIsUploadImage
			})
	}

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
			setIsUploadImage(true)
		}

		return () => {
			setPost(null)
		}
	}, [isChangePost])

	const onSubmit = (data: IData | FieldValues) => {
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

		const categorysIds = data.categorysIds.map((category: ICategorys) => {
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

	return useMemo(
		() => ({
			previewImage,
			setImage,
			isUrlLoading,
			handleSubmit,
			register,
			control,
			errors,
			changeFieldAndTextarea,
			onSubmit,
			setPreviewImage,
			fieldValue,
			categorys,
			isChangePost,
			textareaValue,
			handleUploadImage,
			isUploadImage,
			setIsUploadImage
		}),
		[
			previewImage,
			isUrlLoading,
			control,
			errors,
			fieldValue,
			categorys,
			isChangePost,
			textareaValue,
			isUploadImage
		]
	)
}
