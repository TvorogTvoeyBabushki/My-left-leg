import { useContext } from 'react'

import {
	ISearchDataPostContext,
	SearchDataPostContext
} from '@/providers/SearchDataPostProvider'

export const useSearchDataPost = () =>
	useContext(SearchDataPostContext) as ISearchDataPostContext
