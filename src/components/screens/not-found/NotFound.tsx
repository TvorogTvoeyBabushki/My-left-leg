import styles from './NotFound.module.scss'
import Layout from '@/components/layout/Layout'

const NotFound = () => {
	return (
		<Layout type='not-found'>
			<section>
				<div className='container'>
					<div className={styles.not_found}>There is no such page</div>
				</div>
			</section>
		</Layout>
	)
}

export default NotFound
