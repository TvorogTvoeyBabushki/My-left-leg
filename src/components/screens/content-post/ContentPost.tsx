import {
	FieldValues,
	UseFormHandleSubmit,
	UseFormRegister
} from 'react-hook-form'

import NotFound from '../not-found/NotFound'

import styles from './ContentPost.module.scss'
import ContentPostItem from './content-post-item/ContentPostItem'
import { useContentPost } from './useContentPost'
import Layout from '@/components/layout/Layout'
import { IDataService } from '@/services/post/post.service'

export interface IDataPost {
	heading: string
	mainText: string
	img: string
}

export interface IContentPost {
	typeButton?: string
	handleSubmit: UseFormHandleSubmit<FieldValues | IDataPost, undefined>
	onSubmit: (data: FieldValues | IDataPost) => void
	register: UseFormRegister<IDataPost | FieldValues>
	changeContent: IDataPost
	changeFieldAndTextarea: (
		e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
		type: string
	) => void
	previewImage: string
	setPreviewImage: (previewImage: string) => void
	setImage: (image: File) => void
	isUrlLoading: boolean
	image: File | null
	handlerCancelClick: () => void
	isNotFound?: boolean
	post?: IDataService | undefined
	styles?: CSSModuleClasses
	isToggleList?: boolean
	handleMouseEvent?: (type: string) => void
	indexContent?: number | null
	handleButtonClick?: () => void
	isToggleForm?: boolean
	itemsList?: string[]
	handleEdit?: (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		indexContent: number,
		item: string
	) => void
}

const About = () => {
	const {
		handleMouseEvent,
		isToggleList,
		itemsList,
		handleEdit,
		indexContent,
		handleButtonClick,
		isToggleForm,
		handleSubmit,
		onSubmit,
		register,
		changeContent,
		changeFieldAndTextarea,
		previewImage,
		setPreviewImage,
		setImage,
		isUrlLoading,
		image,
		handlerCancelClick,
		isNotFound,
		post
	} = useContentPost()

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

							<ContentPostItem
								styles={styles}
								post={post}
								handleMouseEvent={handleMouseEvent}
								isToggleList={isToggleList}
								indexContent={indexContent}
								handleSubmit={handleSubmit}
								onSubmit={onSubmit}
								register={register}
								changeContent={changeContent}
								changeFieldAndTextarea={changeFieldAndTextarea}
								previewImage={previewImage}
								setPreviewImage={setPreviewImage}
								setImage={setImage}
								isUrlLoading={isUrlLoading}
								image={image}
								handlerCancelClick={handlerCancelClick}
								handleButtonClick={handleButtonClick}
								isToggleForm={isToggleForm}
								itemsList={itemsList}
								handleEdit={handleEdit}
							/>
						</div>
					</section>
				</Layout>
			)}
		</>
	)
}

export default About
