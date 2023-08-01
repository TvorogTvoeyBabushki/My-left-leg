import clsx from 'clsx'

import { IDataPost } from '@/components/screens/content-post/ContentPost'

import styles from './Button.module.scss'

interface IButtonProps {
	children: JSX.Element | string
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	type: string
	isLoading?: boolean
	changeContent?: IDataPost
	image?: any
}

const Button = ({
	children,
	onClick,
	type = '',
	isLoading,
	changeContent,
	image
}: IButtonProps) => {
	return (
		<button
			className={clsx(styles.button, {
				[styles.modal]: type === 'modal',
				[styles.add_content]: type === 'add content'
			})}
			onClick={onClick}
			disabled={
				isLoading ||
				(!(changeContent?.heading || changeContent?.mainText || image) &&
					type === 'add')
					? true
					: false
			}
		>
			{children}
		</button>
	)
}

export default Button
