import { FC } from 'react'

import ContentPost from '../components/screens/content-post/ContentPost'
import Home from '../components/screens/home/Home'
import Admin from '@/components/screens/admin/Admin'

interface IRoutes {
	path: string
	component: FC
}

export const routes: IRoutes[] = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/:name/:id',
		component: ContentPost
	},
	{
		path: '/manage/login',
		component: Admin
	}
]
