import { useState } from 'react'
import { VscClose, VscMenu } from 'react-icons/vsc'

import { usePost } from '@/hooks/usePost'

import styles from './BurgerMenu.module.scss'
import { selectOptions } from '@/constants/selectOptions'

const BurgerMenu = () => {
	const [isShow, seIsShow] = useState(false)
	const { setCategory } = usePost()

	const sortPost = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		value: string
	) => {
		e.preventDefault()

		if (value === 'all') value = ''

		setCategory(value)
	}

	return (
		<button onClick={() => seIsShow(!isShow)} className={styles.burger}>
			{isShow ? (
				<>
					<VscClose />

					<ul>
						{selectOptions.map((selectOption, index) => (
							<li key={index}>
								<a
									onClick={e => sortPost(e, selectOption.label.toLowerCase())}
									href='#'
								>
									{selectOption.label}
								</a>
							</li>
						))}
					</ul>
				</>
			) : (
				<VscMenu />
			)}
		</button>
	)
}

export default BurgerMenu
