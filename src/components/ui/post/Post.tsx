import { FC, Fragment, useEffect, useState } from 'react'

import { usePost } from '@/hooks/usePost'
import { useSearchDataPost } from '@/hooks/useSearchDataPost'

import styles from './Post.module.scss'
import PopularHashTags from './popular-hashtags/PopularHashtags'
import PopularPost from './popular-post/PopularPost'
import PostItem from './post-item/PostItem'
import { IDataService } from '@/services/post/post.service'

const Post: FC<{
	data: IDataService[]
}> = ({ data }) => {
	const { isSearchPost, searchPost } = useSearchDataPost()
	const { category, postHashtag } = usePost()
	const [sortPost, setSortPost] = useState<IDataService[]>(data)

	useEffect(() => {
		!(category && searchPost && postHashtag) && setSortPost(data)
	}, [data, category, searchPost, postHashtag])

	useEffect(() => {
		if (category) {
			const newSortPost = data.filter(post =>
				post.categorysIds.includes(category)
			)

			setSortPost(newSortPost)
		}
	}, [category])

	useEffect(() => {
		if (searchPost) {
			const newSortSearchPost = data.filter(
				sortPost =>
					sortPost.title
						.toLowerCase()
						.includes(searchPost.trim().toLowerCase()) ||
					sortPost.description
						.toLowerCase()
						.includes(searchPost.trim().toLowerCase())
			)

			setSortPost(newSortSearchPost)
		}
	}, [searchPost])

	useEffect(() => {
		if (postHashtag) {
			const sortPostsHash = data.filter(
				post =>
					post.title.toLowerCase().includes(postHashtag) ||
					post.description.toLowerCase().includes(postHashtag) ||
					post.postContent?.filter(
						content =>
							content.heading.toLowerCase().includes(postHashtag) ||
							content.mainText.toLowerCase().includes(postHashtag)
					)!.length
			)

			setSortPost(sortPostsHash)
		}
	}, [postHashtag])

	return (
		<div className={styles.wrapper}>
			{sortPost!.map((post, index) => (
				<Fragment key={post.id}>
					<PostItem post={post} styles={styles} />
					{index === 5 && <PopularPost data={data} />}
					{index === 8 && <PopularHashTags data={data} />}
				</Fragment>
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
