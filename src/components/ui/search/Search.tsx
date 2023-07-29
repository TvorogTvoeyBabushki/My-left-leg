import { LuSearch } from 'react-icons/lu'

import styles from './Search.module.scss'

const Search = () => {
	return (
		<div className={styles.search_wrapper}>
			<LuSearch />
			<input
				type='text'
				placeholder='Search...'
				name='search'
				className={styles.search}
			/>
		</div>
	)
}

export default Search
