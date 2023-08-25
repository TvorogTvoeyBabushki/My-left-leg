import Cookies from 'js-cookie'
import { FC, useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

import { useAdmin } from '@/hooks/useAdmin'

import Button from '@/components/ui/button/Button'

import styles from './Admin.module.scss'
import AdminForm from './admin-form/AdminForm'
import Layout from '@/components/layout/Layout'

const Admin: FC = () => {
	const { isAdmin, setIsAdmin } = useAdmin()
	const [isTransitionIn, setIsTransitionIn] = useState(false)

	const handleClick = () => {
		setIsTransitionIn(false)
		setIsAdmin(false)

		Cookies.remove('admin')
	}

	useEffect(() => {
		setIsTransitionIn(true)

		return () => setIsTransitionIn(false)
	}, [isTransitionIn])

	return (
		<Layout type='admin-login'>
			<section>
				<div className='container'>
					<div className={styles.wrapper}>
						<h1>Admin Login</h1>
						{isAdmin ? (
							<div>
								<h3>Admin is authorized</h3>
								<Button onClick={handleClick} type='login'>
									Logout
								</Button>
							</div>
						) : (
							<CSSTransition
								in={isTransitionIn}
								timeout={300}
								classNames='admin-form'
							>
								<AdminForm styles={styles} />
							</CSSTransition>
						)}
					</div>
				</div>
			</section>
		</Layout>
	)
}

export default Admin
