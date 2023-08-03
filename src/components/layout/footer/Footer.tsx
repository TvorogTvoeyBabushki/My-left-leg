import styles from './Footer.module.scss'

const Footer = () => {
	const year = new Date().getFullYear()
	return (
		<footer className={styles.footer}>
			<div className='container'>
				<div className={styles.footer_wrapper}>
					<div>
						<nav>
							<ul>
								<li>
									<a href='#'>info</a>
								</li>
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
