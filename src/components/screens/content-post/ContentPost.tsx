import { useMutation } from '@tanstack/react-query'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { FieldValues, UseFormRegister, useForm } from 'react-hook-form'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import reactStringReplace from 'react-string-replace'

import { useImageField } from '@/hooks/useImageField'
import { useSearchDataPost } from '@/hooks/useSearchDataPost'
import { useUploadImage } from '@/hooks/useUploadImage'

import Button from '@/components/ui/button/Button'

import NotFound from '../not-found/NotFound'

import styles from './ContentPost.module.scss'
import ContentPostForm from './content-post-form/ContentPostForm'
import Layout from '@/components/layout/Layout'
import { getTitle } from '@/config/seo/seo.config'
import PostService, { IDataService } from '@/services/post/post.service'

export interface IDataPost {
	heading: string
	mainText: string
	img: string
}

const About = () => {
	const { searchTextContent } = useSearchDataPost()
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
		console.log(changeContent)
	}

	useEffect(() => {
		image && useUploadImage({ image, setUrl, setIsUrlLoading })

		return () => {
			setUrl('')
		}
	}, [image])

	const itemsList = ['Редактировать', 'Удалить']

	return (
		<>
			{isNotFound ? (
				<NotFound />
			) : (
				<Layout type='content' post={post as IDataService}>
					<section>
						<div className='container'>
							<div className={styles.post_title_wrapper}>
								<div>
									<p>
										{post?.categorysIds.map((category, index) =>
											index !== post?.categorysIds.length
												? `${category} `
												: category
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
												{content.heading && (
													<h3>
														{content.heading
															.toLowerCase()
															.includes(searchTextContent) &&
														searchTextContent.length ? (
															reactStringReplace(
																content.heading,
																searchTextContent,
																(match, index) => (
																	<span key={index}>{match}</span>
																)
															)
														) : (
															<>{content.heading}</>
														)}
													</h3>
												)}

												{content.mainText && (
													<p>
														{content.mainText
															.toLowerCase()
															.includes(searchTextContent) &&
														searchTextContent.length
															? reactStringReplace(
																	content.mainText,
																	searchTextContent,
																	(match, index) => (
																		<span key={index}>{match}</span>
																	)
															  )
															: content.mainText}
													</p>
												)}

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
														isUrlLoading={isUrlLoading}
														image={image!}
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
											isUrlLoading={isUrlLoading}
											image={image!}
										/>
									</div>
								)}
							</article>
						</div>
					</section>
				</Layout>
			)}
		</>
	)
}

export default About
