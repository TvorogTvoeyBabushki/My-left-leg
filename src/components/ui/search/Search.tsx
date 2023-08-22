import clsx from 'clsx'
import { IoIosArrowDown } from 'react-icons/io'
import { LuSearch } from 'react-icons/lu'
import { VscClose } from 'react-icons/vsc'

import styles from './Search.module.scss'
import { useSearch } from './useSearch'
import { IDataService } from '@/services/post/post.service'

export interface ISearchProps {
	type: string
	post: IDataService
}

const Search = ({ type, post }: ISearchProps) => {
	const {
		handleInput,
		handleSearch,
		isToggleStyle,
		handleSearchClickUp,
		handleSearchClickDown,
		amountSearchEls,
		counterClick
	} = useSearch({
		post,
		type
	})

	return (
		<>
			{isToggleStyle ? (
				<button className={styles.search} onClick={handleSearch}>
					<LuSearch />
				</button>
			) : (
				<div className={styles.show_input}>
					<div>
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
								<button onClick={handleSearchClickUp}>
									<IoIosArrowDown />
								</button>

								<button onClick={handleSearchClickDown}>
									<IoIosArrowDown />
								</button>
							</div>

							{amountSearchEls ? (
								<span>
									{counterClick + 1}/{amountSearchEls}
								</span>
							) : (
								''
							)}
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
