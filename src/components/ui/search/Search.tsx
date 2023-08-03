import clsx from 'clsx'
import { useState } from 'react'
import { LuSearch } from 'react-icons/lu'

import { useSearchDataPost } from '@/hooks/useSearchDataPost'

import styles from './Search.module.scss'
import { IDataService } from '@/services/post/post.service'

interface ISearchProps {
	data: IDataService[]
	type: string
	post: IDataService
}

const Search = ({ data, type, post }: ISearchProps) => {
	const { setSearchDataPost, setSearchTextContent, setIsSearchPost } =
		useSearchDataPost()
	const [isToggleStyle, setIsToggleStyle] = useState(false)

	const handleSearch = () => {
		isToggleStyle ? setIsToggleStyle(false) : setIsToggleStyle(true)
	}

	const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
		const inputEl = e.target as HTMLInputElement

		if (type === 'content') {
			post.postContent?.forEach(content => {
				if (
					content.heading.toLowerCase().includes(inputEl.value.toLowerCase()) ||
					content.mainText.toLowerCase().includes(inputEl.value.toLowerCase())
				)
					setSearchTextContent(inputEl.value.trim().toLowerCase())
			})
		}

		if (type === 'home') {
			const searchDataPost = data.filter(
				post =>
					post.title.toLowerCase().includes(inputEl.value.toLowerCase()) ||
					post.description.toLowerCase().includes(inputEl.value.toLowerCase())
			)

			setSearchDataPost(searchDataPost)

			inputEl.value.trim().length
				? setIsSearchPost(true)
				: setIsSearchPost(false)
		}
	}

	return (
		<div
			className={clsx(styles.search_wrapper, {
				[styles.active]: isToggleStyle
			})}
		>
			<button onClick={handleSearch}>
				<LuSearch />
			</button>
			<input
				onInput={handleInput}
				type='text'
				placeholder='Search...'
				name='search'
			/>
		</div>
	)
}

export default Search
