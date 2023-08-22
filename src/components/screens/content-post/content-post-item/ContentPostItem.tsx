import { useAdmin } from '@/hooks/useAdmin'

import Button from '@/components/ui/button/Button'
import Loader from '@/components/ui/loader/Loader'

import { IContentPost } from '../ContentPost.interface'
import ContentPostForm from '../content-post-form/ContentPostForm'

import ContentPostItemPublishPart from './ContentPostItemPublishPart'

const ContentPostItem = ({
	styles,
	post,
	handleMouseEvent,
	isToggleList,
	indexContent,
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
	handleButtonClick,
	isToggleForm,
	itemsList,
	handleEdit,
	isMutateLoading
}: IContentPost) => {
	const { isAdmin } = useAdmin()

	return (
		<article className={styles!.article_post}>
			{post?.postContent?.length ? (
				<div className={styles!.content_post_wrapper}>
					{post.postContent.map((content, indexPostContent) => (
						<div key={indexPostContent}>
							{(isMutateLoading && indexContent === indexPostContent) ||
							(isMutateLoading &&
								indexPostContent === post.postContent?.length! - 1 &&
								isToggleForm) ? (
								<Loader type='' />
							) : (
								<ContentPostItemPublishPart
									content={content}
									handleEdit={handleEdit}
									handleMouseEvent={handleMouseEvent}
									indexPostContent={indexPostContent}
									isToggleList={isToggleList}
									itemsList={itemsList}
									styles={styles}
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
								/>
							)}
						</div>
					))}
				</div>
			) : (
				''
			)}

			{isAdmin && (
				<div className={styles!.btn_add_wrapper}>
					<Button
						onClick={handleButtonClick}
						type='add content'
						children={'+'}
					/>
				</div>
			)}

			{isToggleForm && (
				<div className={styles!.form_wrapper}>
					<ContentPostForm
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
						typeButton='add'
					/>
				</div>
			)}
		</article>
	)
}

export default ContentPostItem
