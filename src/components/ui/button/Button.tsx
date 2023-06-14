interface IButtonProps {
	children: JSX.Element | string
	onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button = ({ children, onClick }: IButtonProps) => {
	return <button onClick={onClick}>{children}</button>
}

export default Button
