import { useEffect, useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'

import styles from './Layout.module.scss'
import Footer from './footer/Footer'
import Header from './header/Header'
import { IDataService } from '@/services/post/post.service'

interface IModalProviderProps {
	children: React.ReactNode
	data?: IDataService[]
	type: string
	post?: IDataService
}

const Layout = ({ children, data, type, post }: IModalProviderProps) => {
	const [scroll, setScroll] = useState(0)

	const handleScrollTo = () => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
	}

	useEffect(() => {
		window.addEventListener('scroll', () => setScroll(window.scrollY))

		return () =>
			window.removeEventListener('scroll', () => setScroll(window.scrollY))
	}, [])

	return (
		<section className={styles.layout}>
			<Header
				post={post as IDataService}
				type={type}
				data={data as IDataService[]}
			/>

			{children}

			<Footer />
			{scroll > 300 && (
				<button onClick={handleScrollTo}>
					<IoIosArrowUp />
				</button>
			)}
		</section>
	)
}

export default Layout
