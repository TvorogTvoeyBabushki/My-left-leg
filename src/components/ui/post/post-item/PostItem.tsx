import { Link } from 'react-router-dom'

import PostMenu from '../post-menu/PostMenu'

import { IDataService } from '@/services/post/post.service'

interface IPostItemProps {
	postCollection: IDataService[]
	styles: CSSModuleClasses
}

const PostItem = ({ postCollection, styles }: IPostItemProps) => {
	return (
		<div>
			{postCollection.map(post => (
				<Link
					key={post.id}
					to={`/${post.title.replace(/\s/g, '-').toLowerCase()}/${post.id}`}
				>
					<div>
						<div className={styles.shadow} />
						<img className={styles.image} src={post.img} alt={post.title} />
						<div className={styles.info}>
							<div>
								{post.categorysIds.map((category, index) => (
									<p key={index}>
										{index !== post.categorysIds.length - 1
											? `${category},`
											: category}
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
	)
}

export default PostItem
