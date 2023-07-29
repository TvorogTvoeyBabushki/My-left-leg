import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { usePost } from '@/hooks/usePost'
import { useSearchDataPost } from '@/hooks/useSearchDataPost'

import styles from './Post.module.scss'
import PostMenu from './post-menu/PostMenu'
import { IDataService } from '@/services/post/post.service'

interface IPostProps {
	data: IDataService[]
}

const Post = (props: IPostProps) => {
	const { searchDataPost } = useSearchDataPost()
	const { category, setPost } = usePost()
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
				<div key={index}>
					{postCollection.map(post => (
						<Link
							key={post.id}
							to={`/${post.title.replace(/\s/g, '-').toLowerCase()}/${post.id}`}
							onClick={() => setPost(post)}
						>
							<div>
								<div className={styles.shadow} />
								<img className={styles.image} src={post.img} alt={post.title} />
								<div className={styles.info}>
									<div>
										{post.categorysIds.map((category, index) => (
											<p key={index}>
												{index === 0 ? category : `, ${category}`}
											</p>
										))}
									</div>
									<p>{post.title}</p>
									<p>{post.description}</p>
								</div>

								<PostMenu styles={styles} post={post as IDataService} />
							</div>
						</Link>
					))}
				</div>
			))}
			{!data.length && (
				<div
					style={{
						fontSize: '30px'
					}}
				>
					There are no such posts
				</div>
			)}
		</div>
	)
}

export default Post
