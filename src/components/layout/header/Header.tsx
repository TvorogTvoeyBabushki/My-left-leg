import clsx from 'clsx'
import { BiArrowBack } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'

import styles from './Header.module.scss'
import NavMenu from './nav-menu/NavMenu'
import { IDataService } from '@/services/post/post.service'

export interface IHeaderProps {
	type: string
	post: IDataService
}

const Header = ({ type, post }: IHeaderProps) => {
	const navigate = useNavigate()

	return (
		<header className={styles.header}>
			<div className='container'>
				<div
					className={clsx(styles.wrapper, {
						[styles.content]: type === 'content',
						[styles.admin_login]: type === 'admin-login'
					})}
				>
					{type !== 'home' && (
						<button onClick={() => navigate('/')}>
							<BiArrowBack />
						</button>
					)}

					{type !== 'not-found' && (
						<div className={styles.logo}>
							<Link to='/'>
								{/* <img src='/myleftleg.svg' alt='' /> */}
								<h1>my left leg</h1>
							</Link>
						</div>
					)}

					{(type === 'home' || type === 'content') && (
						<NavMenu type={type} post={post} />
					)}
				</div>
			</div>
		</header>
	)
}

export default Header
