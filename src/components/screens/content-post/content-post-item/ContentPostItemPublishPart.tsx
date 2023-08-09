import clsx from 'clsx'
import { FC } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import reactStringReplace from 'react-string-replace'

import { useSearchDataPost } from '@/hooks/useSearchDataPost'

import { IContentPost } from '../ContentPost.interface'
import ContentPostForm from '../content-post-form/ContentPostForm'

const ContentPostItemPublishPart: FC<IContentPost> = ({
	content,
	handleEdit,
	handleMouseEvent,
	indexPostContent,
	isToggleList,
	itemsList,
	styles,
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
	handlerCancelClick
}) => {
	const { searchTextContent } = useSearchDataPost()

	return (
		<>
			{content!.heading && (
				<h3>
					{content!.heading.toLowerCase().includes(searchTextContent) &&
					searchTextContent.length
						? reactStringReplace(
								content!.heading,
								searchTextContent,
								(match, index) => (
									<span key={index} className='search_word'>
										{match}
									</span>
								)
						  )
						: content!.heading}
				</h3>
			)}
			{content!.mainText && (
				<p>
					{content!.mainText.toLowerCase().includes(searchTextContent) &&
					searchTextContent.length
						? reactStringReplace(
								content!.mainText,
								searchTextContent,
								(match, index) => (
									<span key={index} className='search_word'>
										{match}
									</span>
								)
						  )
						: content!.mainText}
				</p>
			)}
			{content!.img && (
				<div>
					<img src={content!.img} alt='Content image' />
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
									handleEdit!(e, indexPostContent!, item.toLowerCase())
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
		</>
	)
}

export default ContentPostItemPublishPart
