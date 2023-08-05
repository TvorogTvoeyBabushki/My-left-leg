import clsx from 'clsx'
import { BsThreeDotsVertical } from 'react-icons/bs'
import reactStringReplace from 'react-string-replace'

import { useSearchDataPost } from '@/hooks/useSearchDataPost'

import Button from '@/components/ui/button/Button'

import { IContentPost } from '../ContentPost'
import ContentPostForm from '../content-post-form/ContentPostForm'

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
	handleEdit
}: IContentPost) => {
	const { searchTextContent } = useSearchDataPost()

	return (
		<article className={styles!.article_post}>
			{post?.postContent?.length ? (
				<div className={styles!.content_post_wrapper}>
					{post.postContent.map((content, indexPostContent) => (
						<div key={indexPostContent}>
							{content.heading && (
								<h3>
									{content.heading.toLowerCase().includes(searchTextContent) &&
									searchTextContent.length
										? reactStringReplace(
												content.heading,
												searchTextContent,
												(match, index) => <span key={index}>{match}</span>
										  )
										: content.heading}
								</h3>
							)}

							{content.mainText && (
								<p>
									{content.mainText.toLowerCase().includes(searchTextContent) &&
									searchTextContent.length
										? reactStringReplace(
												content.mainText,
												searchTextContent,
												(match, index) => <span key={index}>{match}</span>
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
								className={styles!.menu_wrapper}
								onMouseOver={() => handleMouseEvent!('over')}
								onMouseOut={() => handleMouseEvent!('out')}
							>
								<button
									className={clsx(styles!.btn, {
										[styles!.btn_active]: isToggleList
									})}
								>
									<BsThreeDotsVertical />
								</button>

								<ul>
									{itemsList!.map((item, indexItemList) => (
										<li key={indexItemList}>
											<a
												onClick={e =>
													handleEdit!(e, indexPostContent, item.toLowerCase())
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
									typeButton='change'
								/>
							)}
						</div>
					))}
				</div>
			) : (
				''
			)}

			<div className={styles!.btn_add_wrapper}>
				<Button onClick={handleButtonClick} type='add content' children={'+'} />
			</div>

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
