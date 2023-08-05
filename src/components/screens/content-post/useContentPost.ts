import { useMutation } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { useImageField } from '@/hooks/useImageField'
import { useUploadImage } from '@/hooks/useUploadImage'

import { IDataPost } from './ContentPost'
import { getTitle } from '@/config/seo/seo.config'
import PostService, { IDataService } from '@/services/post/post.service'

export const useContentPost = () => {
	const { setIsToggleImage, setIsToggleIcon } = useImageField()

	const [image, setImage] = useState<File | null>(null)
	const [url, setUrl] = useState('')
	const [isUrlLoading, setIsUrlLoading] = useState(false)
	const [previewImage, setPreviewImage] = useState('')
	const [changeContent, setChangeContent] = useState<IDataPost>({
		heading: '',
		mainText: '',
		img: ''
	})
	const [indexContent, setIndexContent] = useState<number | null>(null)
	const [isToggleForm, setIsToggleForm] = useState(false)
	const [isToggleList, setIsToggleList] = useState(false)
	const [post, setPost] = useState<IDataService>()

	const params = useParams() // забрать из {id, name}
	const postIdPath = +params.id!
	const postNamePath = params.name!
	const [isNotFound, setIsNotFound] = useState(false)

	const fetchPost = async () => {
		try {
			const response = await PostService.getPost(postIdPath)

			if (
				postNamePath !== response.data.title.replace(/\s/g, '-').toLowerCase()
			) {
				setIsNotFound(true)
				return
			}

			setPost(response.data)
		} catch (error) {
			console.log('error: ', error)

			setIsNotFound(true)
		}
	}

	useEffect(() => {
		fetchPost()
	}, [])

	useEffect(() => {
		getTitle('content', post?.title as string)
	}, [post])

	useEffect(() => {
		const certainContent = post?.postContent?.find(
			(content, index) => index === indexContent
		)

		certainContent
			? (setChangeContent(certainContent),
			  setPreviewImage(certainContent?.img),
			  certainContent.img
					? (setIsToggleImage(true), setIsToggleIcon(false))
					: (setIsToggleImage(false), setIsToggleIcon(true)),
			  setUrl(certainContent?.img))
			: (setChangeContent({ heading: '', mainText: '', img: '' }),
			  setIsToggleIcon(true))
	}, [indexContent])

	const { register, handleSubmit, reset } = useForm<IDataPost | FieldValues>({
		mode: 'onChange'
	})

	const { mutate } = useMutation(
		['add post content'],
		(body: IDataService) => PostService.update(body, postIdPath),
		{
			onSuccess: () => {
				setIsToggleForm(false)
				reset()
				setIsToggleIcon(true)
				setChangeContent({ heading: '', mainText: '', img: '' })
				setImage(null)
			}
		}
	)

	const handleButtonClick = () => {
		!isToggleForm
			? (setIsToggleForm(true),
			  setIndexContent(null),
			  setPreviewImage(''),
			  setIsToggleImage(false),
			  setUrl(''),
			  reset(),
			  setChangeContent({ heading: '', mainText: '', img: '' }))
			: setIsToggleForm(false)
	}

	const onSubmit = (data: IDataPost | FieldValues) => {
		if (isToggleForm) {
			data = { ...data, img: url }
			post?.postContent?.push(data as IDataPost)

			setChangeContent({ heading: '', mainText: '', img: '' })
		}

		if (!isToggleForm) {
			post?.postContent?.forEach((content, index) => {
				if (index === indexContent) {
					content.heading = changeContent.heading
					content.mainText = changeContent.mainText
					content.img = url
				}
			})

			setIndexContent(null)
			setIsToggleImage(false)
		}

		mutate(post as IDataService)
	}

	const handleMouseEvent = (type: string) => {
		type === 'over' ? setIsToggleList(true) : setIsToggleList(false)
	}

	const handleEdit = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		indexContent: number,
		item: string
	) => {
		e.preventDefault()

		item === 'редактировать' &&
			(setIndexContent(indexContent), setIsToggleForm(false))

		if (item === 'удалить') {
			post?.postContent?.forEach((content, index) => {
				if (index === indexContent) {
					content.heading = ''
					content.mainText = ''
					content.img = ''
				}
			})

			const deletePostContent = post?.postContent?.filter(
				content => content.heading || content.mainText || content.img
			)
			const modifiedPost = { ...post, postContent: deletePostContent }

			mutate(modifiedPost as IDataService)
			setPost(modifiedPost as IDataService)
		}
	}

	const handlerCancelClick = () => {
		setIndexContent(null)
		setIsToggleImage(false)
	}

	const changeFieldAndTextarea = (
		e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>,
		type: string
	) => {
		const targetEl = e.target as HTMLTextAreaElement | HTMLInputElement

		type === 'textarea'
			? setChangeContent({ ...changeContent!, mainText: targetEl.value })
			: setChangeContent({ ...changeContent!, heading: targetEl.value })
	}

	useEffect(() => {
		image && useUploadImage({ image, setUrl, setIsUrlLoading })

		return () => {
			setUrl('')
		}
	}, [image])

	const itemsList = ['Редактировать', 'Удалить']

	return useMemo(
		() => ({
			isNotFound,
			post,
			handleMouseEvent,
			isToggleList,
			itemsList,
			handleEdit,
			indexContent,
			changeContent,
			changeFieldAndTextarea,
			handleSubmit,
			handlerCancelClick,
			onSubmit,
			register,
			previewImage,
			setPreviewImage,
			setImage,
			isUrlLoading,
			image,
			handleButtonClick,
			isToggleForm
		}),
		[
			isNotFound,
			post,
			isToggleList,
			itemsList,
			indexContent,
			changeContent,
			previewImage,
			isUrlLoading,
			isToggleForm
		]
	)
}
