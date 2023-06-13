interface IFieldProps {
	type: string
	name: string
	placeholder?: string
	accept: string
	value?: string | number
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Field = ({
	type = 'text',
	name,
	placeholder = '',
	accept = '',
	value,
	onChange
}: IFieldProps) => {
	return (
		<input
			className='field-image'
			type={type}
			name={name}
			placeholder={placeholder}
			accept={accept}
			value={value}
			onChange={onChange}
		/>
	)
}

export default Field
