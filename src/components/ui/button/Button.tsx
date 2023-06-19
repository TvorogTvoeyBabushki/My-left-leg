import clsx from 'clsx'

import styles from './Button.module.scss'

interface IButtonProps {
	children: JSX.Element | string
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	type: string
}

const Button = ({ children, onClick, type = '' }: IButtonProps) => {
	return (
		<button
			className={clsx(styles.button, {
				[styles.modal]: !!type
			})}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

export default Button
