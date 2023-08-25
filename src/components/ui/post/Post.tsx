import { FC, useEffect, useState } from 'react'

import { usePost } from '@/hooks/usePost'
import { useSearchDataPost } from '@/hooks/useSearchDataPost'

import styles from './Post.module.scss'
import PostItem from './post-item/PostItem'
import { IDataService } from '@/services/post/post.service'

const Post: FC<{
	data: IDataService[]
}> = ({ data }) => {
	const { isSearchPost } = useSearchDataPost()
	const { category } = usePost()
	const [sortPost, setSortPost] = useState<IDataService[]>(data)

	useEffect(() => {
		if (category) {
			const newSortPost = data.filter(post =>
				post.categorysIds.includes(category)
			)
			setSortPost(newSortPost)
		} else {
			setSortPost(data)
		}
	}, [category])

	return (
		<div className={styles.wrapper}>
			{sortPost!.map(post => (
				<PostItem key={post.id} post={post} styles={styles} />
			))}

			{!sortPost!.length && (
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
