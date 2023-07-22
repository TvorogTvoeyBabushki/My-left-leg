import { Link } from 'react-router-dom'

import { useModal } from '@/hooks/useModal'

import Button from '@/components/ui/button/Button'

import styles from './Header.module.scss'
import BurgerMenu from './burger menu/BurgerMenu'

const Header = () => {
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

					<Button type='' onClick={showModal}>
						Create post
					</Button>
				</div>
			</div>
		</header>
	)
}

export default Header
