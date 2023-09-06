import { AdvancedImage, placeholder } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import { useAdmin } from '@/hooks/useAdmin'

import PostMenu from '../post-menu/PostMenu'

import { cloudName } from '@/config/cloudinary/cloudName.config'
import { IDataService } from '@/services/post/post.service'
import { publicID } from '@/utils/cloudinary/publicID'

interface IPostItemProps {
	post: IDataService
	styles: CSSModuleClasses
}

const PostItem = ({ post, styles }: IPostItemProps) => {
	const postRef = useRef(null)
	const { isAdmin } = useAdmin()

	const [isTransitionIn, setIsTransitionIn] = useState(false)

	useEffect(() => {
		setIsTransitionIn(true)
	}, [])

	return (
		<CSSTransition
			in={isTransitionIn}
			nodeRef={postRef}
			timeout={300}
			classNames='admin-form'
			unmountOnExit
		>
			<Link
				ref={postRef}
				to={`/${post.title.replace(/\s/g, '-').toLowerCase()}/${post.id}`}
			>
				<div>
					<div className={styles.shadow} />
					{/* <AdvancedImage
						cldImg={new Cloudinary({
							cloud: { cloudName: cloudName }
						}).image(publicID(post.img))}
						plugins={[placeholder({ mode: 'blur' })]}
					/> */}
					<img src={post.img} alt='' />

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

					{isAdmin && <PostMenu post={post as IDataService} />}
				</div>
			</Link>
		</CSSTransition>
	)
}

export default PostItem
