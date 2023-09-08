import clsx from 'clsx'
import { FunctionComponent } from 'react'

import { useAdmin } from '@/hooks/useAdmin'
import { useImageField } from '@/hooks/useImageField'
import { useModal } from '@/hooks/useModal'

import Button from '@/components/ui/button/Button'
import Exit from '@/components/ui/exit/Exit'
import Search from '@/components/ui/search/Search'

import { IHeaderProps } from '../Header'
import BurgerMenu from '../burger menu/BurgerMenu'

import styles from './NavMenu.module.scss'
import { useNavMenu } from './useNavMenu'
import { selectOptions } from '@/constants/selectOptions'

const NavMenu: FunctionComponent<IHeaderProps> = ({ type, post }) => {
	const { clientWidth, isShowNavList, setIsShowNavList, sortPost } =
		useNavMenu()
	const { setIsToggleIcon, setIsToggleImage } = useImageField()
	const { showModal } = useModal()
	const { isAdmin } = useAdmin()

	return (
		<div className={styles.wrapper}>
			<nav
				className={clsx('', {
					[styles.active]: isShowNavList && clientWidth <= 960
				})}
			>
				<ul>
					{selectOptions.map((navItem, index) => (
						<li key={index}>
							<a
								onClick={e => {
									sortPost(e, navItem.label.toLowerCase())
								}}
								href='#'
							>
								{navItem.label}
							</a>
						</li>
					))}
				</ul>
			</nav>

			{type !== 'admin-login' ? (
				<div>
					{type !== 'not-found' && <Search type={type} post={post} />}

					{type === 'home' && isAdmin && (
						<Button
							type='create-post'
							onClick={() => {
								showModal()
								setIsToggleIcon(true)
								setIsToggleImage(false)
							}}
						>
							Create post
						</Button>
					)}

					<BurgerMenu
						type={type}
						isShowNavList={isShowNavList}
						setIsShowNavList={setIsShowNavList}
					/>

					{isAdmin && <Exit />}
				</div>
			) : (
				<div></div>
			)}
		</div>
	)
}

export default NavMenu
