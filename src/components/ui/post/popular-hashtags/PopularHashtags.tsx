import { FunctionComponent, useEffect, useState } from 'react'

import styles from './PopularHashTags.module.scss'
import { IDataService } from '@/services/post/post.service'
import { number, symbol } from '@/utils/regex'

const PopularHashTags: FunctionComponent<{ data: IDataService[] }> = ({
	data
}) => {
	const [words, setWords] = useState<string[]>([])

	useEffect(() => {
		const allWords: string[] = []
		const allContentPost: string[] = []

		data.forEach(post => {
			post.postContent?.forEach(content => {
				allContentPost.push(
					...content.heading.split(' '),
					...content.mainText.split(' ')
				)
			})

			allWords.push(...post.title.split(' '), ...post.description.split(' '))
		})
		allWords.push(...allContentPost)

		const countRepeatWords = allWords.reduce(
			(acc: { [x: string]: number }, item) => {
				if (symbol.test(item) || number.test(item) || item.length < 4) {
					return acc
				}

				if (acc.hasOwnProperty(item.toLowerCase())) {
					acc[item.toLowerCase()] += 1
				} else {
					acc[item.toLowerCase()] = 1
				}

				return acc
			},
			{}
		)

		for (const [word, amount] of Object.entries(countRepeatWords).sort(
			(a, b) => b[1] - a[1]
		)) {
			setWords(prev => [...new Set([...prev, word])])
		}
	}, [])

	const handleLinkClick = () => {}

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
