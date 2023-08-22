import Cookies from 'js-cookie'
import { FC } from 'react'
import { RxExit } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'

import { useAdmin } from '@/hooks/useAdmin'

import styles from './Exit.module.scss'

const Exit: FC = () => {
	const { setIsAdmin } = useAdmin()
	const navigate = useNavigate()

	const handleExit = () => {
		setIsAdmin(false)
		navigate('/manage/login')

		Cookies.remove('admin')
	}

	return (
		<button onClick={handleExit} className={styles.exit}>
			<RxExit />
		</button>
	)
}

export default Exit
