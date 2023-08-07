import { useEffect, useMemo, useState } from 'react'

import { useSearchDataPost } from '@/hooks/useSearchDataPost'

import { IDataService } from '@/services/post/post.service'

interface IUseSearchProps {
	type: string
	post: IDataService
}

export const useSearch = ({ type, post }: IUseSearchProps) => {
	const {
		setSearchDataPost,
		setSearchTextContent,
		setIsSearchPost,
		searchDataPost: data,
		isCloseSearch,
		setIsCloseSearch
	} = useSearchDataPost()
	const [isToggleStyle, setIsToggleStyle] = useState(true)

	const handleSearch = () => {
		isToggleStyle
			? (setIsToggleStyle(false), setIsCloseSearch(true))
			: (setIsToggleStyle(true),
			  setSearchTextContent(''),
			  setIsSearchPost(false),
			  setSearchDataPost(data),
			  setIsCloseSearch(false))
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
			const searchDataPost = data!.filter(
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
		() => ({
			handleSearch,
			handleInput,
			isToggleStyle,
			isCloseSearch
		}),
		[isToggleStyle, isCloseSearch]
	)
}
