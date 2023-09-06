import { FC, createContext, useState } from 'react'

import { IDataService } from '@/services/post/post.service'

export interface ISearchDataPostContext {
	searchPost: string
	setSearchPost: (searchDataPost: string) => void
	searchTextContent: string
	setSearchTextContent: (searchTextContent: string) => void
	isSearchPost: boolean
	setIsSearchPost: (isSearchPost: boolean) => void
}

export const SearchDataPostContext =
	createContext<ISearchDataPostContext | null>(null)

const SearchDataPostProvider: FC<{ children: JSX.Element }> = ({
	children
}) => {
	const [searchPost, setSearchPost] = useState('')
	const [searchTextContent, setSearchTextContent] = useState('')
	const [isSearchPost, setIsSearchPost] = useState(false)

	return (
		<SearchDataPostContext.Provider
			value={{
				searchPost,
				setSearchPost,
				searchTextContent,
				setSearchTextContent,
				isSearchPost,
				setIsSearchPost
			}}
		>
			{children}
		</SearchDataPostContext.Provider>
	)
}

export default SearchDataPostProvider
