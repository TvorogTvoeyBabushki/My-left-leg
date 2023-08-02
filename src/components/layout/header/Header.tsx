import { Link } from 'react-router-dom'

import { useImageField } from '@/hooks/useImageField'
import { useModal } from '@/hooks/useModal'

import Button from '@/components/ui/button/Button'
import Search from '@/components/ui/search/Search'

import styles from './Header.module.scss'
import BurgerMenu from './burger menu/BurgerMenu'
import { IDataService } from '@/services/post/post.service'

interface IHeaderProps {
	data: IDataService[]
	type: string
	post: IDataService
}

const Header = ({ data, type, post }: IHeaderProps) => {
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
						{type !== 'not-found' && (
							<Search data={data} type={type} post={post} />
						)}

						{type === 'home' && (
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
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
