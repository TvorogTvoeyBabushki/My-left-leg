import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAdmin } from '@/hooks/useAdmin'
import { useImageField } from '@/hooks/useImageField'
import { useModal } from '@/hooks/useModal'
import { usePost } from '@/hooks/usePost'
import { useSearchDataPost } from '@/hooks/useSearchDataPost'

import Button from '@/components/ui/button/Button'
import Exit from '@/components/ui/exit/Exit'
import Search from '@/components/ui/search/Search'

import { IHeaderProps } from '../Header'
import BurgerMenu from '../burger menu/BurgerMenu'

import styles from './NavMenu.module.scss'
import { selectOptions } from '@/constants/selectOptions'

const NavMenu: FC<IHeaderProps> = ({ type, post }) => {
	const { isAdmin } = useAdmin()
	const { showModal } = useModal()
	const { setIsToggleIcon, setIsToggleImage } = useImageField()
	const { setIsSearchPost } = useSearchDataPost()
	const { setCategory } = usePost()

	const [isShowNavList, setIsShowNavList] = useState(false)
	const [clientWidth, setClientWidth] = useState(
		document.documentElement.clientWidth
	)
	const { pathname } = useLocation()
	const navigate = useNavigate()

	const sortPost = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		value: string
	) => {
		e.preventDefault()
		setIsSearchPost(true)

		pathname !== '/' && navigate('/')

		if (value === 'всё') {
			value = ''
			setIsSearchPost(false)
		}

		setCategory(value)
	}

	useEffect(() => {
		window.addEventListener('resize', () => {
			setClientWidth(document.documentElement.clientWidth)
		})

		return () =>
			window.removeEventListener('resize', () => {
				setClientWidth(document.documentElement.clientWidth)
			})
	}, [])

	return (
		<div className={styles.wrapper}>
			<nav
				className={clsx('', {
					[styles.active]: isShowNavList && clientWidth < 960
				})}
			>
				<ul>
					{selectOptions.map((navItem, index) => (
						<li key={index}>
							<a
								onClick={e => sortPost(e, navItem.label.toLowerCase())}
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
