import { useState } from 'react'
import { VscClose, VscMenu } from 'react-icons/vsc'

import styles from './BurgerMenu.module.scss'

const BurgerMenu = () => {
	const [isShow, seIsShow] = useState(false)

	return (
		<button onClick={() => seIsShow(!isShow)} className={styles.burger}>
			{isShow ? (
				<>
					<VscClose />

					<ul>
						<li>
							<a href='#'>BEAUTY</a>
						</li>
						<li>
							<a href='#'>WELLNESS</a>
						</li>
						<li>
							<a href='#'>STYLE</a>
						</li>
						<li>
							<a href='#'>HOME</a>
						</li>
						<li>
							<a href='#'>LIFE</a>
						</li>
					</ul>
				</>
			) : (
				<VscMenu />
			)}
		</button>
	)
}

export default BurgerMenu
