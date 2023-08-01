import { useMutation } from '@tanstack/react-query'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useParams } from 'react-router-dom'

import { useImageField } from '@/components/ui/field/image-field/hooks/useImageField'
import { useUploadImage } from '@/hooks/useUploadImage'

import Button from '@/components/ui/button/Button'

import styles from './ContentPost.module.scss'
import ContentPostForm from './content-post-form/ContentPostForm'
import Layout from '@/components/layout/Layout'
import PostService, { IDataService } from '@/services/post/post.service'

export interface IDataPost {
	heading: string
	mainText: string
	img: any
}

const About = () => {
	const { isToggleImage, setIsToggleImage } = useImageField()
	const [image, setImage] = useState<any>('')
	const [url, setUrl] = useState<any>('')
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
	const params = useParams()
	const postId = +params.id!

	const fetchPost = async () => {
		const response = await PostService.getPost(postId)

		setPost(response.data)
	}

	useEffect(() => {
		fetchPost()
	}, [])

	useEffect(() => {
		const certainContent = post?.postContent?.find(
			(content, index) => index === indexContent
		)

		certainContent
			? (setChangeContent(certainContent),
			  setPreviewImage(certainContent?.img),
			  certainContent.img ? setIsToggleImage(true) : setIsToggleImage(false),
			  setUrl(certainContent?.img))
			: setChangeContent({ heading: '', mainText: '', img: '' })
	}, [indexContent])

	const { register, handleSubmit, reset } = useForm<IDataPost>({
		mode: 'onChange'
	})

	const { mutate } = useMutation(
		['add post content'],
		(body: IDataService) => PostService.update(body, postId),
		{
			onSuccess: () => {
				setIsToggleForm(false)
				reset()
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

	const onSubmit = (data: IDataPost) => {
		if (isToggleForm) {
			data = { ...data, img: url }
			post?.postContent?.push(data)

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
		useUploadImage({ image, setUrl, setIsUrlLoading })

		return () => {
			setUrl('')
		}
	}, [image])

	const itemsList = ['Редактировать', 'Удалить']

	return (
		<Layout>
			<section>
				<div className='container'>
					<div className={styles.post_title_wrapper}>
						<div>
							<p>
								{post?.categorysIds.map((category, index) =>
									index === 0 ? category : `, ${category}`
								)}
							</p>

							<h1>{post?.title}</h1>

							<p>by: author</p>

							<div>messengers</div>
						</div>

						<div>
							<img src={post?.img} alt='Post image' />
						</div>
					</div>

					<article className={styles.article_post}>
						{post?.postContent?.length ? (
							<div className={styles.content_post_wrapper}>
								{post.postContent.map((content, indexPostContent) => (
									<div key={indexPostContent}>
										{content.heading && <h3>{content.heading}</h3>}

										{content.mainText && <p>{content.mainText}</p>}

										{content.img && (
											<div>
												<img src={content.img} alt='Content image' />
											</div>
										)}

										<div
											className={styles.menu_wrapper}
											onMouseOver={() => handleMouseEvent('over')}
											onMouseOut={() => handleMouseEvent('out')}
										>
											<button
												className={clsx(styles.btn, {
													[styles.btn_active]: isToggleList
												})}
											>
												<BsThreeDotsVertical />
											</button>

											<ul>
												{itemsList.map((item, indexItemList) => (
													<li key={indexItemList}>
														<a
															onClick={e =>
																handleEdit(
																	e,
																	indexPostContent,
																	item.toLowerCase()
																)
															}
															href='#'
														>
															{item}
														</a>
													</li>
												))}
											</ul>
										</div>

										{indexPostContent === indexContent && (
											<ContentPostForm
												changeContent={changeContent}
												changeFieldAndTextarea={changeFieldAndTextarea}
												handleSubmit={handleSubmit}
												handlerCancelClick={handlerCancelClick}
												onSubmit={onSubmit}
												register={register}
												typeButton='change'
												previewImage={previewImage}
												setPreviewImage={setPreviewImage}
												setImage={setImage}
												isToggleImage={isToggleImage}
												setIsToggleImage={setIsToggleImage}
												isUrlLoading={isUrlLoading}
												image={image}
											/>
										)}
									</div>
								))}
							</div>
						) : (
							''
						)}

						<div className={styles.btn_add_wrapper}>
							<Button
								onClick={handleButtonClick}
								type='add content'
								children={'+'}
							/>
						</div>

						{isToggleForm && (
							<div className={styles.form_wrapper}>
								<ContentPostForm
									changeContent={changeContent}
									changeFieldAndTextarea={changeFieldAndTextarea}
									handleSubmit={handleSubmit}
									handlerCancelClick={handlerCancelClick}
									onSubmit={onSubmit}
									register={register}
									typeButton='add'
									previewImage={previewImage}
									setPreviewImage={setPreviewImage}
									setImage={setImage}
									isToggleImage={isToggleImage}
									setIsToggleImage={setIsToggleImage}
									isUrlLoading={isUrlLoading}
									image={image}
								/>
							</div>
						)}
					</article>
				</div>
			</section>
		</Layout>
	)
}

export default About
