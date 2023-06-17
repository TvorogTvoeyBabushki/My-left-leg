interface IFieldProps {
	register: any // ???
	name: string
	className: string
	ref?: any

	[x: string]: any // для rest
}

const Field = ({ ref, register, name, className, ...rest }: IFieldProps) => {
	return (
		<input
			ref={ref}
			{...register(name, { required: 'required' })}
			{...rest}
			className={className}
		/>
	)
}

export default Field
