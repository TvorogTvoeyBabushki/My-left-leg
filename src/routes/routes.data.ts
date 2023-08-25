import { FunctionComponent } from 'react'

import ContentPost from '../components/screens/content-post/ContentPost'
import Home from '../components/screens/home/Home'
import AboutMe from '@/components/screens/about/AboutMe'
import Admin from '@/components/screens/admin/Admin'
import Contacts from '@/components/screens/contacts/Contacts'

interface IRoutes {
	path: string
	component: FunctionComponent
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
	},
	{
		path: '/about',
		component: AboutMe
	},
	{
		path: '/contacts',
		component: Contacts
	}
]
