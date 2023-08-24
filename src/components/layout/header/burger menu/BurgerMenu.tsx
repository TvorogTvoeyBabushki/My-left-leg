import { FC } from 'react'
import { VscClose, VscMenu } from 'react-icons/vsc'

import styles from './BurgerMenu.module.scss'
import { useBurgerMenu } from './useBurgerMenu'

const BurgerMenu: FC<{
	type: string
	isShowNavList: boolean
	setIsShowNavList: (isShowNavList: boolean) => void
}> = ({ type, isShowNavList, setIsShowNavList }) => {
	const { clientWidth, isShow, handleClick } = useBurgerMenu(
		isShowNavList,
		setIsShowNavList
	)
	return (
		<button onClick={handleClick} className={styles.burger}>
			{(type === 'home' || type === 'content') &&
				clientWidth < 960 &&
				(isShow ? <VscClose /> : <VscMenu />)}
		</button>
	)
}

export default BurgerMenu
