import Header from './header/Header'

interface IModalProviderProps {
	children: React.ReactNode
}

const Layout = ({ children }: IModalProviderProps) => {
	return (
		<section>
			<Header />

			{children}
		</section>
	)
}

export default Layout
