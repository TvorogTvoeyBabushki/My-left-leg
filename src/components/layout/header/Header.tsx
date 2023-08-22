import { Link } from 'react-router-dom'

import { useAdmin } from '@/hooks/useAdmin'
import { useImageField } from '@/hooks/useImageField'
import { useModal } from '@/hooks/useModal'

import Button from '@/components/ui/button/Button'
import Exit from '@/components/ui/exit/Exit'
import Search from '@/components/ui/search/Search'

import styles from './Header.module.scss'
import BurgerMenu from './burger menu/BurgerMenu'
import { IDataService } from '@/services/post/post.service'

interface IHeaderProps {
	type: string
	post: IDataService
}

const Header = ({ type, post }: IHeaderProps) => {
	const { isAdmin } = useAdmin()
	const { showModal } = useModal()
	const { setIsToggleIcon, setIsToggleImage } = useImageField()

	return (
		<header className={styles.header}>
			<div className='container'>
				<div className={styles.wrapper}>
					<BurgerMenu type={type} />

					{type !== 'not-found' && (
						<div className={styles.logo}>
							<Link to='/'>
								{/* <img src='/myleftleg.svg' alt='' /> */}
								Logo
							</Link>
						</div>
					)}

					<div>
						{type !== 'not-found' && <Search type={type} post={post} />}

						{type === 'home' && isAdmin && (
							<Button
								type=''
								onClick={() => {
									showModal()
									setIsToggleIcon(true)
									setIsToggleImage(false)
								}}
							>
								Create post
							</Button>
						)}

						{isAdmin && <Exit />}
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
