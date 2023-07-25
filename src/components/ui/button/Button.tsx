import clsx from 'clsx'

import styles from './Button.module.scss'

interface IButtonProps {
	children: JSX.Element | string
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	type: string
	isLoading?: boolean
}

const Button = ({ children, onClick, type = '', isLoading }: IButtonProps) => {
	return (
		<button
			className={clsx(styles.button, {
				[styles.modal]: !!type
			})}
			onClick={onClick}
			disabled={isLoading ? true : false}
		>
			{children}
		</button>
	)
}

export default Button
