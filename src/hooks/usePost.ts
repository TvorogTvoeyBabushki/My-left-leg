import { useContext } from 'react'

import { IPostContextType, PostContext } from '@/providers/PostProvider'

export const usePost = () => useContext(PostContext) as IPostContextType
