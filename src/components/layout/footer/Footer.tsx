import { useNavigate } from 'react-router-dom'

import styles from './Footer.module.scss'

const Footer = () => {
	const year = new Date().getFullYear()
	const liData = ['о проекте', 'контакты']
	const navigate = useNavigate()

	const handleClickLink = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
	) => {
		e.preventDefault()

		const targetEl = e.target as HTMLAnchorElement

		targetEl.textContent === 'о проекте'
			? navigate('/about')
			: navigate('/contacts')
	}

	return (
		<footer className={styles.footer}>
			<div className='container'>
				<div className={styles.footer_wrapper}>
					<div>
						<nav>
							<ul>
								{liData.map((item, index) => (
									<li key={index}>
										<a onClick={handleClickLink} href='#'>
											{item}
										</a>
									</li>
								))}
							</ul>
						</nav>

						<div>messengers</div>
					</div>

					<div>My Left Leg &copy; {year}</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
