import { useMutation } from '@tanstack/react-query'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useParams } from 'react-router-dom'

import Button from '@/components/ui/button/Button'

import styles from './ContentPost.module.scss'
import ContentPostForm from './content-post-form/ContentPostForm'
import Layout from '@/components/layout/Layout'
import PostService, { IDataService } from '@/services/post/post.service'

export interface IDataPost {
	heading: string
	mainText: string
}

const About = () => {
	const [changeContent, setChangeContent] = useState<IDataPost>({
		heading: '',
		mainText: ''
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
			? setChangeContent(certainContent)
			: setChangeContent({ heading: '', mainText: '' })
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
			  reset(),
			  setChangeContent({ heading: '', mainText: '' }))
			: setIsToggleForm(false)
	}

	const onSubmit = (data: IDataPost) => {
		if (isToggleForm) {
			post?.postContent?.push(data)

			mutate(post as IDataService)
			setChangeContent({ heading: '', mainText: '' })
		}

		if (!isToggleForm) {
			post?.postContent?.forEach((content, index) => {
				if (index === indexContent) {
					content.heading = changeContent.heading
					content.mainText = changeContent.mainText
				}
			})

			const deletePostContent = post?.postContent?.filter(
				content => content.heading || content.mainText
			)
			const modifiedPost = { ...post, postContent: deletePostContent }

			mutate(modifiedPost as IDataService)
			setPost(modifiedPost as IDataService)
			setIndexContent(null)
		}
	}

	const handleMouseEvent = (type: string) => {
		type === 'over' ? setIsToggleList(true) : setIsToggleList(false)
	}

	const handleEdit = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		indexContent: number
	) => {
		e.preventDefault()

		setIndexContent(indexContent)
		setIsToggleForm(false)
	}

	const handlerCancelClick = () => {
		setIndexContent(null)
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
								{post.postContent.map((content, index) => (
									<div key={index}>
										<h3>{content.heading}</h3>

										<p>{content.mainText}</p>

										<div
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
												<li>
													<a onClick={e => handleEdit(e, index)} href='#'>
														Редактировать
													</a>
												</li>
											</ul>
										</div>

										{index === indexContent && (
											<ContentPostForm
												changeContent={changeContent}
												changeFieldAndTextarea={changeFieldAndTextarea}
												handleSubmit={handleSubmit}
												handlerCancelClick={handlerCancelClick}
												onSubmit={onSubmit}
												register={register}
												typeButton='change'
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
