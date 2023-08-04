import clsx from 'clsx'
import { useState } from 'react'
import { LuSearch } from 'react-icons/lu'
import { VscClose } from 'react-icons/vsc'

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
	const [isToggleStyle, setIsToggleStyle] = useState(true)

	const handleSearch = () => {
		isToggleStyle ? setIsToggleStyle(false) : setIsToggleStyle(true)
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

	return (
		<>
			{isToggleStyle ? (
				<div
					className={clsx(styles.search_wrapper, {
						[styles.active]: isToggleStyle
					})}
				>
					<button onClick={handleSearch}>
						<LuSearch />
					</button>
				</div>
			) : (
				<div className={styles.show_input}>
					<div>
						<div>
							<LuSearch />
							<input
								onInput={handleInput}
								type='text'
								placeholder='Search...'
								name='search'
								autoFocus
							/>
						</div>

						<div>
							<button onClick={handleSearch}>
								<VscClose />
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Search
