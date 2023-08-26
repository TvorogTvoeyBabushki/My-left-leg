import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

import styles from './PopularPost.module.scss'
import { IDataService } from '@/services/post/post.service'

const PopularPost: FunctionComponent<{ data: IDataService[] }> = ({ data }) => {
	return (
		<div className={styles.popular_post}>
			<h3>Популярное</h3>

			<nav>
				<ul>
					{data
						.filter(post => post.countVisits)
						.sort((a, b) => b.countVisits! - a.countVisits!)
						.slice(0, 3)
						.map(post => (
							<li key={post.id}>
								<Link
									to={`/${post.title}/${post.id}`
										.replace(/\s/g, '-')
										.toLowerCase()}
								>
									{post.title}
								</Link>
							</li>
						))}
				</ul>
			</nav>
		</div>
	)
}

export default PopularPost
