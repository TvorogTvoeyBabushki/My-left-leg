import clsx from 'clsx'
import { FC } from 'react'

import styles from './Loader.module.scss'

const Loader: FC<{ type: string }> = ({ type }) => {
	return (
		<img
			className={clsx(styles.loader, {
				[styles.home]: type === 'home' || type === 'content'
			})}
			src='/loader.svg'
			alt='loader'
		/>
	)
}

export default Loader
