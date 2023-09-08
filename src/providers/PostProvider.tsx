import { FC, createContext, useState } from 'react'

import { IDataService } from '@/services/post/post.service'

export interface IPostContextType {
	post: IDataService | null
	setPost: (post: IDataService | null) => void
	isInteractionPost: boolean
	setIsInteractionPost: (isInteractionPost: boolean) => void
	category: string
	setCategory: (category: string) => void
	postHashtag: string
	setPostHashtag: (postHashtag: string) => void
}

export const PostContext = createContext<IPostContextType | null>(null)

const PostProvider: FC<{ children: JSX.Element }> = ({ children }) => {
	const [post, setPost] = useState<IDataService | null>(null)
	const [isInteractionPost, setIsInteractionPost] = useState(false)
	const [category, setCategory] = useState('')
	const [postHashtag, setPostHashtag] = useState('')

	return (
		<PostContext.Provider
			value={{
				post,
				setPost,
				isInteractionPost,
				setIsInteractionPost,
				category,
				setCategory,
				postHashtag,
				setPostHashtag
			}}
		>
			{children}
		</PostContext.Provider>
	)
}

export default PostProvider
