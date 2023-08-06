import clsx from 'clsx'

import styles from './Loader.module.scss'

interface ILoaderProps {
	type: string
}

const Loader = ({ type }: ILoaderProps) => {
	return (
		<img
			className={clsx(styles.loader, {
				[styles.home]: type === 'home' || type === 'content'
			})}
			src='/public/loader.svg'
			alt='loader'
		/>
	)
}

export default Loader
