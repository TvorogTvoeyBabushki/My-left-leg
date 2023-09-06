import Loader from '@/components/ui/loader/Loader'

import NotFound from '../not-found/NotFound'

import styles from './ContentPost.module.scss'
import ContentPostItem from './content-post-item/ContentPostItem'
import { useContentPost } from './useContentPost'
import Layout from '@/components/layout/Layout'
import { IDataService } from '@/services/post/post.service'

const About = () => {
	const contentProps = useContentPost()

	return (
		<>
			{contentProps.isNotFound ? (
				<NotFound />
			) : (
				<Layout type='content' post={contentProps.post as IDataService}>
					<section
						style={{
							marginTop: '20px'
						}}
					>
						<div className='container'>
							{contentProps.isPostLoading ? (
								<Loader type='content' />
							) : (
								<>
									<div className={styles.post_title_wrapper}>
										<div>
											<p>
												{contentProps.post?.categorysIds.map(
													(category, index) =>
														index !== contentProps.post?.categorysIds.length
															? `${category} `
															: category
												)}
											</p>

											<h1>{contentProps.post?.title}</h1>

											<p>by: author</p>

											<div>messengers</div>
										</div>

										<div>
											{contentProps.post?.img && (
												<img
													src={contentProps.post.img}
													alt={contentProps.post.title}
												/>
											)}
										</div>
									</div>

									<ContentPostItem styles={styles} {...contentProps} />
								</>
							)}
						</div>
					</section>
				</Layout>
			)}
		</>
	)
}

export default About
