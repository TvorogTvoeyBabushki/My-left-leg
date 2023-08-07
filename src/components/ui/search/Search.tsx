import clsx from 'clsx'
import { useEffect } from 'react'
import { LuSearch } from 'react-icons/lu'
import { VscClose } from 'react-icons/vsc'

import styles from './Search.module.scss'
import { useSearch } from './useSearch'
import { IDataService } from '@/services/post/post.service'

interface ISearchProps {
	type: string
	post: IDataService
}

const Search = ({ type, post }: ISearchProps) => {
	const { handleInput, handleSearch, isToggleStyle, isCloseSearch } = useSearch(
		{
			post,
			type
		}
	)

	return (
		<>
			{isToggleStyle && !isCloseSearch ? (
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
