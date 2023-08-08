import { useEffect, useMemo, useState } from 'react'

import { useSearchDataPost } from '@/hooks/useSearchDataPost'

import { IDataService } from '@/services/post/post.service'

interface IUseSearchProps {
	type: string
	post: IDataService
	styles: CSSModuleClasses
}

export const useSearch = ({ type, post, styles }: IUseSearchProps) => {
	const {
		setSearchDataPost,
		setSearchTextContent,
		setIsSearchPost,
		getDataPost: data,
		searchTextContent
	} = useSearchDataPost()
	const [isToggleStyle, setIsToggleStyle] = useState(true)
	const [amountSearchEls, setAmountSearchEls] = useState(0)
	const [counterClick, setCounterClick] = useState(0)

	const searchEls = document.querySelectorAll('.search_word')

	useEffect(() => {
		const searchEls = document.querySelectorAll('.search_word')

		searchTextContent &&
			(searchEls[counterClick].scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'nearest'
			}),
			searchEls.forEach((el, index) => {
				const spanEL = el as HTMLSpanElement

				index === counterClick
					? (spanEL.style.backgroundColor = '#ffb93a')
					: (spanEL.style.backgroundColor = '#0078d7')
			}))

		setAmountSearchEls(searchEls.length)
	}, [searchTextContent, counterClick])

	const handleSearch = () => {
		isToggleStyle
			? (setIsToggleStyle(false), setAmountSearchEls(0), setCounterClick(0))
			: (setIsToggleStyle(true),
			  setSearchTextContent(''),
			  setIsSearchPost(false),
			  setSearchDataPost(data))
	}

	const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
		const inputEl = e.target as HTMLInputElement

		inputEl.value.trim().length && setCounterClick(0)

		if (type === 'content') {
			post.postContent?.forEach(content => {
				if (
					content.heading
						.toLowerCase()
						.includes(inputEl.value.trim().toLowerCase()) ||
					content.mainText
						.toLowerCase()
						.includes(inputEl.value.trim().toLowerCase())
				) {
					setSearchTextContent(inputEl.value.trim().toLowerCase())
				}
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

	const handleSearchClickUp = () => {
		if (searchEls.length) {
			counterClick === 0
				? setCounterClick(searchEls.length - 1)
				: setCounterClick(prev => {
						prev--

						return prev
				  })
		}
	}

	const handleSearchClickDown = () => {
		if (searchEls.length) {
			counterClick === searchEls.length - 1
				? setCounterClick(0)
				: setCounterClick(prev => {
						prev++

						return prev
				  })
		}
	}

	return useMemo(
		() => ({
			handleSearch,
			handleInput,
			isToggleStyle,
			handleSearchClickUp,
			handleSearchClickDown,
			amountSearchEls,
			counterClick
		}),
		[isToggleStyle, amountSearchEls, counterClick]
	)
}
