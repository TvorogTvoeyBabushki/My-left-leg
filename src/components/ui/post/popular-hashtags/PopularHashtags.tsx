import { FunctionComponent, useEffect } from 'react'

import styles from './PopularHashTags.module.scss'
import { IDataService } from '@/services/post/post.service'

const PopularHashTags: FunctionComponent<{ data: IDataService[] }> = ({
	data
}) => {
	useEffect(() => {
		data.forEach(post => {
			const a = post.title.split(' ')
			const set = new Set(a)
			let count = 0
			set.forEach(item => {
				a.includes(item) && count++
			})
			console.log(count)
		})
	}, [])
	return (
		<div className={styles.popular_hashtags}>
			<h3>популярные тэги</h3>
		</div>
	)
}

export default PopularHashTags
