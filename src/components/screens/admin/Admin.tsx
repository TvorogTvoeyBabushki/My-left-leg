import { FC } from 'react'

import styles from './Admin.module.scss'
import AdminForm from './admin-form/AdminForm'

const Admin: FC = () => {
	return (
		<div className={styles.wrapper}>
			<h1>Admin Login</h1>
			<AdminForm styles={styles} />
		</div>
	)
}

export default Admin
