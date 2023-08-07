import { FC, createContext, useState } from 'react'

import { IDataService } from '@/services/post/post.service'

export interface ISearchDataPostContext {
	searchDataPost: IDataService[] | null
	setSearchDataPost: (searchDataPost: IDataService[] | null) => void
	searchTextContent: string
	setSearchTextContent: (searchTextContent: string) => void
	isSearchPost: boolean
	setIsSearchPost: (isSearchPost: boolean) => void
	isCloseSearch: boolean
	setIsCloseSearch: (isCloseSearch: boolean) => void
}

export const SearchDataPostContext =
	createContext<ISearchDataPostContext | null>(null)

const SearchDataPostProvider: FC<{ children: JSX.Element }> = ({
	children
}) => {
	const [searchDataPost, setSearchDataPost] = useState<IDataService[] | null>(
		null
	)
	const [searchTextContent, setSearchTextContent] = useState('')
	const [isSearchPost, setIsSearchPost] = useState(false)
	const [isCloseSearch, setIsCloseSearch] = useState(false)

	return (
		<SearchDataPostContext.Provider
			value={{
				searchDataPost,
				setSearchDataPost,
				searchTextContent,
				setSearchTextContent,
				isSearchPost,
				setIsSearchPost,
				isCloseSearch,
				setIsCloseSearch
			}}
		>
			{children}
		</SearchDataPostContext.Provider>
	)
}

export default SearchDataPostProvider
