interface IFieldProps {
	className: string
	type: string
	name: string
	placeholder?: string
	accept?: string
	value?: string | number
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
	onMouseOver?: () => void
}

const Field = ({
	className,
	type,
	name,
	placeholder,
	accept,
	value,
	onChange,
	onMouseOver
}: IFieldProps) => {
	return (
		<input
			className={className}
			type={type}
			name={name}
			placeholder={placeholder}
			accept={accept}
			value={value}
			onChange={onChange}
			onMouseOver={onMouseOver}
		/>
	)
}

export default Field
