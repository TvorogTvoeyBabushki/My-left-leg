import { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { VscClose, VscMenu } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'

import { usePost } from '@/hooks/usePost'

import styles from './BurgerMenu.module.scss'
import { selectOptions } from '@/constants/selectOptions'

interface IBurgerMenu {
	type: string
}

const BurgerMenu = ({ type }: IBurgerMenu) => {
	const [isShow, seIsShow] = useState(false)
	const { setCategory } = usePost()
	const navigate = useNavigate()

	const sortPost = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		value: string
	) => {
		e.preventDefault()

		if (value === 'all') value = ''

		setCategory(value)
	}

	return (
		<button
			onClick={() => {
				seIsShow(!isShow)
				type !== 'home' && navigate('/')
			}}
			className={styles.burger}
		>
			{type === 'home' ? (
				isShow ? (
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
				)
			) : (
				<BiArrowBack />
			)}
		</button>
	)
}

export default BurgerMenu
