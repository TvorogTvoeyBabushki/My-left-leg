import { useAdmin } from '@/hooks/useAdmin'

import Button from '@/components/ui/button/Button'
import Loader from '@/components/ui/loader/Loader'

import { IContentPost } from '../ContentPost.interface'
import ContentPostForm from '../content-post-form/ContentPostForm'

import ContentPostItemPublishPart from './ContentPostItemPublishPart'

const ContentPostItem = ({ styles, ...contentProps }: IContentPost) => {
	const { isAdmin } = useAdmin()

	return (
		<article className={styles!.article_post}>
			{contentProps.post?.postContent?.length ? (
				<div className={styles!.content_post_wrapper}>
					{contentProps.post.postContent.map((content, indexPostContent) => (
						<div key={indexPostContent}>
							{(contentProps.isMutateLoading &&
								contentProps.indexContent === indexPostContent) ||
							(contentProps.isMutateLoading &&
								indexPostContent ===
									contentProps.post!.postContent?.length! - 1 &&
								contentProps.isToggleForm) ? (
								<Loader type='' />
							) : (
								<ContentPostItemPublishPart
									content={content}
									indexPostContent={indexPostContent}
									styles={styles}
									{...contentProps}
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
						onClick={contentProps.handleButtonClick}
						type='add content'
						children={'+'}
					/>
				</div>
			)}

			{contentProps.isToggleForm && (
				<div className={styles!.form_wrapper}>
					<ContentPostForm typeButton='add' {...contentProps} />
				</div>
			)}
		</article>
	)
}

export default ContentPostItem
