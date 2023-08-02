import styles from './Layout.module.scss'
import Header from './header/Header'
import { IDataService } from '@/services/post/post.service'

interface IModalProviderProps {
	children: React.ReactNode
	data?: IDataService[]
	type: string
	post?: IDataService
}

const Layout = ({ children, data, type, post }: IModalProviderProps) => {
	return (
		<section className={styles.layout}>
			<Header
				post={post as IDataService}
				type={type}
				data={data as IDataService[]}
			/>

			{children}
		</section>
	)
}

export default Layout
