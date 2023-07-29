import Header from './header/Header'
import { IDataService } from '@/services/post/post.service'

interface IModalProviderProps {
	children: React.ReactNode
	data: IDataService[]
}

const Layout = ({ children, data }: IModalProviderProps) => {
	return (
		<section>
			<Header data={data} />

			{children}
		</section>
	)
}

export default Layout
