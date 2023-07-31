import About from '../components/screens/content-post/ContentPost'
import Home from '../components/screens/home/Home'

interface IRoutes {
	path: string
	component: () => JSX.Element
}

export const routes: IRoutes[] = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/:name/:id',
		component: About
	}
]
