import { createContext, useState } from 'react'

import { IDataService } from '@/services/post/post.service'

interface ISearchDataPostProps {
	children: JSX.Element
}

export interface ISearchDataPostContext {
	searchDataPost: IDataService[] | null
	setSearchDataPost: (searchDataPost: IDataService[] | null) => void
}

export const SearchDataPostContext =
	createContext<ISearchDataPostContext | null>(null)

const SearchDataPostProvider = ({ children }: ISearchDataPostProps) => {
	const [searchDataPost, setSearchDataPost] = useState<IDataService[] | null>(
		null
	)

	return (
		<SearchDataPostContext.Provider
			value={{ searchDataPost, setSearchDataPost }}
		>
			{children}
		</SearchDataPostContext.Provider>
	)
}

export default SearchDataPostProvider
