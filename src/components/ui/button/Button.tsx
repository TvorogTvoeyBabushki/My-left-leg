import styles from './Button.module.scss'

interface IButtonProps {
	children: JSX.Element | string
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	type?: 'button' | 'submit' | 'reset' | undefined
}

const Button = ({ children, onClick, type }: IButtonProps) => {
	return (
		<button type={type} className={styles.button} onClick={onClick}>
			{children}
		</button>
	)
}

export default Button
