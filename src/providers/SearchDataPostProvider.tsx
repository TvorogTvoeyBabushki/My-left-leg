import { FC, createContext, useState } from 'react'

import { IDataService } from '@/services/post/post.service'

export interface ISearchDataPostContext {
	getDataPost: IDataService[] | null
	setGetDataPost: (searchDataPost: IDataService[] | null) => void
	searchDataPost: IDataService[] | null
	setSearchDataPost: (searchDataPost: IDataService[] | null) => void
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
	const [getDataPost, setGetDataPost] = useState<IDataService[] | null>(null)
	const [searchDataPost, setSearchDataPost] = useState<IDataService[] | null>(
		null
	)
	const [searchTextContent, setSearchTextContent] = useState('')
	const [isSearchPost, setIsSearchPost] = useState(false)

	return (
		<SearchDataPostContext.Provider
			value={{
				getDataPost,
				setGetDataPost,
				searchDataPost,
				setSearchDataPost,
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
