import { Fragment } from 'react'

import styles from './Post.module.scss'
import { IDataService } from '@/services/post/post.service'

const Post = ({ data }: IDataService | any) => {
	const oddPostElements = data.filter(
		(post: IDataService, index: number) => (index + 1) % 2 !== 0
	)
	const evenPostElements = data.filter(
		(post: IDataService) => !oddPostElements.includes(post)
	)

	return (
		<div className={styles.wrapper}>
			<div>
				{oddPostElements.map((post: IDataService) => (
					<div key={post.id} className={styles.odd}>
						<a href='/'>
							<div>
								<div className={styles.shadow} />
								<img className={styles.image} src={post.img} alt={post.title} />
								<div className={styles.info}>
									<p>{post.title}</p>
									<p>{post.description}</p>
								</div>
							</div>
						</a>
					</div>
				))}
			</div>
			<div>
				{evenPostElements.map((post: IDataService) => (
					<div key={post.id} className={styles.even}>
						<a href='/'>
							<div>
								<div className={styles.shadow} />
								<img className={styles.image} src={post.img} alt={post.title} />
								<div className={styles.info}>
									<p>{post.title}</p>
									<p>{post.description}</p>
								</div>
							</div>
						</a>
					</div>
				))}
			</div>
		</div>
	)
}

export default Post
