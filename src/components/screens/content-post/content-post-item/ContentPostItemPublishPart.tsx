import clsx from 'clsx'
import { FC } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import reactStringReplace from 'react-string-replace'

import { useAdmin } from '@/hooks/useAdmin'
import { useSearchDataPost } from '@/hooks/useSearchDataPost'

import { IContentPost } from '../ContentPost.interface'
import ContentPostForm from '../content-post-form/ContentPostForm'

const ContentPostItemPublishPart: FC<IContentPost> = ({
	content,
	indexPostContent,
	styles,
	...contentProps
}) => {
	const { searchTextContent } = useSearchDataPost()
	const { isAdmin } = useAdmin()

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
					{content?.img && <img src={content.img} alt={content.heading} />}
				</div>
			)}
			{isAdmin && (
				<div
					className={styles!.menu_wrapper}
					onMouseOver={() => contentProps.handleMouseEvent!('over')}
					onMouseOut={() => contentProps.handleMouseEvent!('out')}
				>
					<button
						className={clsx(styles!.btn, {
							[styles!.btn_active]: contentProps.isToggleList
						})}
					>
						<BsThreeDotsVertical />
					</button>

					<ul>
						{contentProps.itemsList!.map((item, indexItemList) => (
							<li key={indexItemList}>
								<a
									onClick={e =>
										contentProps.handleEdit!(
											e,
											indexPostContent!,
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
			)}
			{indexPostContent === contentProps.indexContent && (
				<ContentPostForm typeButton='change' {...contentProps} />
			)}
		</>
	)
}

export default ContentPostItemPublishPart
