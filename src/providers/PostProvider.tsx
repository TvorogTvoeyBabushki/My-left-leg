import { createContext, useState } from 'react'

import { IDataService } from '@/services/post/post.service'

interface IPostProviderProps {
	children: JSX.Element
}

export interface IPostContextType {
	post: IDataService | null
	setPost: (post: IDataService | null) => void
	isInteractionPost: boolean
	setIsInteractionPost: (isInteractionPost: boolean) => void
	category: string
	setCategory: (category: string) => void
}

export const PostContext = createContext<IPostContextType | null>(null)

const PostProvider = ({ children }: IPostProviderProps) => {
	const [post, setPost] = useState<IDataService | null>(null)
	const [isInteractionPost, setIsInteractionPost] = useState(false)
	const [category, setCategory] = useState('')

	return (
		<PostContext.Provider
			value={{
				post,
				setPost,
				isInteractionPost,
				setIsInteractionPost,
				category,
				setCategory
			}}
		>
			{children}
		</PostContext.Provider>
	)
}

export default PostProvider
