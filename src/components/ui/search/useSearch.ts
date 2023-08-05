import { useMemo, useState } from 'react'

import { useSearchDataPost } from '@/hooks/useSearchDataPost'

import { IDataService } from '@/services/post/post.service'

interface IUseSearchProps {
	type: string
	post: IDataService
	data: IDataService[]
}

export const useSearch = ({ type, post, data }: IUseSearchProps) => {
	const { setSearchDataPost, setSearchTextContent, setIsSearchPost } =
		useSearchDataPost()
	const [isToggleStyle, setIsToggleStyle] = useState(true)

	const handleSearch = () => {
		isToggleStyle
			? setIsToggleStyle(false)
			: (setIsToggleStyle(true), setSearchTextContent(''))
	}

	const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
		const inputEl = e.target as HTMLInputElement

		if (type === 'content') {
			post.postContent?.forEach(content => {
				if (
					content.heading
						.toLowerCase()
						.includes(inputEl.value.trim().toLowerCase()) ||
					content.mainText
						.toLowerCase()
						.includes(inputEl.value.trim().toLowerCase())
				)
					setSearchTextContent(inputEl.value.trim().toLowerCase())
			})
		}

		if (type === 'home') {
			const searchDataPost = data.filter(
				post =>
					post.title
						.toLowerCase()
						.includes(inputEl.value.trim().toLowerCase()) ||
					post.description
						.toLowerCase()
						.includes(inputEl.value.trim().toLowerCase())
			)

			setSearchDataPost(searchDataPost)

			inputEl.value.trim().length
				? setIsSearchPost(true)
				: setIsSearchPost(false)
		}
	}

	return useMemo(
		() => ({ handleSearch, handleInput, isToggleStyle }),
		[isToggleStyle]
	)
}
