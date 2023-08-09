import Loader from '@/components/ui/loader/Loader'

import NotFound from '../not-found/NotFound'

import styles from './ContentPost.module.scss'
import ContentPostItem from './content-post-item/ContentPostItem'
import { useContentPost } from './useContentPost'
import Layout from '@/components/layout/Layout'
import { IDataService } from '@/services/post/post.service'

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
		post,
		isPostLoading,
		isMutateLoading
	} = useContentPost()

	return (
		<>
			{isNotFound ? (
				<NotFound />
			) : (
				<Layout type='content' post={post as IDataService}>
					<section>
						<div className='container'>
							{isPostLoading ? (
								<Loader type='content' />
							) : (
								<>
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
										isMutateLoading={isMutateLoading}
									/>
								</>
							)}
						</div>
					</section>
				</Layout>
			)}
		</>
	)
}

export default About
