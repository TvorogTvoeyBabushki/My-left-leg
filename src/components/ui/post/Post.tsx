import { Fragment } from 'react'

import { usePost } from '@/hooks/usePost'
import { useSearchDataPost } from '@/hooks/useSearchDataPost'

import styles from './Post.module.scss'
import PostItem from './post-item/PostItem'
import { IDataService } from '@/services/post/post.service'

interface IPostProps {
	data: IDataService[]
}

const Post = (props: IPostProps) => {
	const { searchDataPost, isSearchPost } = useSearchDataPost()
	const { category, isMutateLoading, postId } = usePost()
	let { data } = props
	let newData = [] as IDataService[][]

	if (searchDataPost) data = searchDataPost

	if (category) {
		const sortPost = data.filter(post => post.categorysIds.includes(category))
		data = sortPost
	}

	data.forEach((postCollectionOne, indexOne) => {
		if (indexOne % 2 === 0) {
			data.forEach((postCollectionTwo, indexTwo) => {
				if (indexOne !== indexTwo) {
					if (indexOne + 1 === indexTwo) {
						newData.pop()

						newData = [...newData, [postCollectionOne, postCollectionTwo]]
					}
					if (indexOne + 1 !== indexTwo && indexOne - 1 === indexTwo) {
						newData = [...newData, [postCollectionOne]]
					}
				}
			})
		}
	})

	if (data.length === 1) newData = [data]

	return (
		<div className={styles.wrapper}>
			{newData.map((postCollection, index) => (
				<Fragment key={index}>
					{index === 0 ? (
						<div>
							<PostItem
								isMutateLoading={isMutateLoading}
								postCollection={postCollection}
								styles={styles}
								postId={postId}
							/>
						</div>
					) : (
						<PostItem
							isMutateLoading={isMutateLoading}
							postCollection={postCollection}
							styles={styles}
							postId={postId}
						/>
					)}
				</Fragment>
			))}
			{!data.length && (
				<div
					style={{
						fontSize: '30px',
						justifyContent: 'flex-start'
					}}
				>
					{isSearchPost ? 'There are no such posts' : 'No posts'}
				</div>
			)}
		</div>
	)
}

export default Post
