import { AdvancedImage, placeholder } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'
import { Link } from 'react-router-dom'

import PostMenu from '../post-menu/PostMenu'

import { cloudName } from '@/config/cloudinary/cloudName.config'
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
						{/* сокротить код внизу */}
						<AdvancedImage
							cldImg={new Cloudinary({
								cloud: { cloudName: cloudName }
							}).image(
								post.img
									.join('')
									.split('')
									.reverse()
									.join('')
									.replace(/\/.+/, '')
									.replace('gpj.', '')
									.split('')
									.reverse()
									.join('')
							)}
							plugins={[placeholder({ mode: 'blur' })]}
						/>

						{/* <img className={styles.image} src={post.img} alt={post.title} /> */}
						<div className={styles.info}>
							<div>
								{post.categorysIds.map((category, categoryIndex) => (
									<p key={categoryIndex}>
										{categoryIndex !== post.categorysIds.length - 1
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
