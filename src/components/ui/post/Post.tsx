import styles from './Post.module.scss'
import PostMenu from './post-menu/PostMenu'
import { IDataService } from '@/services/post/post.service'

interface IPostProps {
	data: IDataService[]
}

const Post = (props: IPostProps) => {
	const { data } = props
	let newData = [] as IDataService[][]

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
						<a key={post.id} href='/'>
							<div>
								<div className={styles.shadow} />
								<img className={styles.image} src={post.img} alt={post.title} />
								<div className={styles.info}>
									<p>{post.title}</p>
									<p>{post.description}</p>
								</div>

								<PostMenu styles={styles} post={post as IDataService} />
							</div>
						</a>
					))}
				</div>
			))}
		</div>
	)
}

export default Post
