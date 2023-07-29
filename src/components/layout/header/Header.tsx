import { Link } from 'react-router-dom'

import { useModal } from '@/hooks/useModal'

import Button from '@/components/ui/button/Button'
import Search from '@/components/ui/search/Search'

import styles from './Header.module.scss'
import BurgerMenu from './burger menu/BurgerMenu'
import { IDataService } from '@/services/post/post.service'

interface IHeaderProps {
	data: IDataService[]
}

const Header = ({ data }: IHeaderProps) => {
	const { showModal } = useModal()

	return (
		<header>
			<div className='container'>
				<div className={styles.wrapper}>
					<BurgerMenu />

					<div className={styles.logo}>
						<Link to='/'>
							{/* <img src='/myleftleg.svg' alt='' /> */}
							Logo
						</Link>
					</div>

					<div>
						<Search data={data} />

						<Button type='' onClick={showModal}>
							Create post
						</Button>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
