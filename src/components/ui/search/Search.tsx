import { useRef } from 'react'
import { LuSearch } from 'react-icons/lu'

import { useSearchDataPost } from '@/hooks/useSearchDataPost'

import styles from './Search.module.scss'
import { IDataService } from '@/services/post/post.service'

interface ISearchProps {
	data: IDataService[]
}

const Search = ({ data }: ISearchProps) => {
	const { setSearchDataPost } = useSearchDataPost()
	const inputRef = useRef<HTMLDivElement | null>(null)

	const handleSearch = () => {
		inputRef && inputRef.current?.classList.toggle(styles.active)
	}

	const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
		const inputEl = e.target as HTMLInputElement

		const searchDataPost = data.filter(
			post =>
				post.title.includes(inputEl.value) ||
				post.description.includes(inputEl.value)
		)

		setSearchDataPost(searchDataPost)
	}

	return (
		<div ref={inputRef} className={styles.search_wrapper}>
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
