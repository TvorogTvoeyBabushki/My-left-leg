import { AdvancedImage, placeholder } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'
import { Link } from 'react-router-dom'

import { useAdmin } from '@/hooks/useAdmin'

import PostMenu from '../post-menu/PostMenu'

import { cloudName } from '@/config/cloudinary/cloudName.config'
import { IDataService } from '@/services/post/post.service'
import { publicID } from '@/utils/cloudinary/publicID'

interface IPostItemProps {
	postCollection: IDataService[]
	styles: CSSModuleClasses
}

const PostItem = ({ postCollection, styles }: IPostItemProps) => {
	const { isAdmin } = useAdmin()

	return (
		<div>
			{postCollection.map(post => (
				<Link
					key={post.id}
					to={`/${post.title.replace(/\s/g, '-').toLowerCase()}/${post.id}`}
				>
					<div>
						<div className={styles.shadow} />
						<AdvancedImage
							cldImg={new Cloudinary({
								cloud: { cloudName: cloudName }
							}).image(publicID(post.img))}
							plugins={[placeholder({ mode: 'blur' })]}
						/>

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

						{isAdmin && (
							<PostMenu styles={styles} post={post as IDataService} />
						)}
					</div>
				</Link>
			))}
		</div>
	)
}

export default PostItem
