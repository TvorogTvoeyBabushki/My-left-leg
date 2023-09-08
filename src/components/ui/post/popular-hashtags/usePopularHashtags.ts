import { useEffect, useMemo, useState } from 'react'

import { usePost } from '@/hooks/usePost'

import { IDataService } from '@/services/post/post.service'
import { number, symbol } from '@/utils/regex'

export const usePopularHashtags = (data: IDataService[]) => {
	const [words, setWords] = useState<string[]>([])
	const { setPostHashtag } = usePost()

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

	const handleLinkClick = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
	) => {
		e.preventDefault()

		const targetEl = e.target as HTMLAnchorElement
		setPostHashtag(targetEl.textContent!)
	}

	return useMemo(
		() => ({
			words,
			handleLinkClick
		}),
		[words]
	)
}
