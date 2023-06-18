import { Fragment } from 'react'

import styles from './Post.module.scss'
import { IDataService } from '@/services/post/post.service'

const Post = ({ data }: IDataService | any) => {
	return (
		<div className={styles.wrapper}>
			{data.map((post: IDataService, index: number) => (
				<>
					{(index + 1) % 2 !== 0 ? (
						<div className={styles.odd}>
							<a href='/'>
								<div>
									<img src={post.img} alt='' />
									<div>
										<p>{post.title}</p>
										<p>{post.description}</p>
									</div>
								</div>
							</a>
						</div>
					) : (
						<div className={styles.even}>
							<a href='/'>
								<div>
									<img src={post.img} alt='' />
									<div>
										<p>{post.title}</p>
										<p>{post.description}</p>
									</div>
								</div>
							</a>
						</div>
					)}
				</>
			))}
		</div>
	)
}

export default Post
