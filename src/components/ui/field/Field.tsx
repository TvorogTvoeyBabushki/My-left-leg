interface IFieldProps {
	register: any // ???
	name: string
	className: string

	[x: string]: any // для rest
}

const Field = ({ register, name, className, ...rest }: IFieldProps) => {
	return (
		<input
			{...register(name, { required: 'required' })}
			{...rest}
			className={className}
		/>
	)
}

export default Field
