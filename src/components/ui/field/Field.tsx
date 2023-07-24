interface IFieldProps {
	register: any // ???
	name: string
	value?: string
	className: string

	[x: string]: any // для rest
}

const Field = ({ register, name, value, className, ...rest }: IFieldProps) => {
	return (
		<input
			{...register(name, {
				required: name === 'img' ? false : true
			})}
			value={value}
			{...rest}
			className={className}
		/>
	)
}

export default Field
