import { FunctionComponent } from 'react'

import styles from './PopularHashTags.module.scss'
import { usePopularHashtags } from './usePopularHashtags'
import { IDataService } from '@/services/post/post.service'

const PopularHashTags: FunctionComponent<{ data: IDataService[] }> = ({
	data
}) => {
	const { words, handleLinkClick } = usePopularHashtags(data)

	return (
		<div className={styles.popular_hashtags}>
			<h3>популярные тэги</h3>
			<nav>
				<ul>
					{words.slice(0, 17).map((liItem, index) => (
						<li key={index}>
							<a onClick={handleLinkClick} href='#'>
								{liItem}
							</a>
						</li>
					))}
				</ul>
			</nav>
		</div>
	)
}

export default PopularHashTags
