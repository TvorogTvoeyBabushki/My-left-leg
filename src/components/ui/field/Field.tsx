interface IFieldProps {
	register: any // ???
	name: string
	options: {
		required: string
	}
	error?: string
	value?: string
	className: string

	[x: string]: any // для rest
}

const Field = ({
	register,
	name,
	options,
	error,
	value,
	className,
	...rest
}: IFieldProps) => {
	return (
		<>
			{error && (
				<div
					style={{
						marginBottom: '10px',
						textAlign: 'center',
						color: 'red',
						position: name === 'img' ? 'absolute' : 'relative',
						top: 0
					}}
				>
					{error}
				</div>
			)}
			<input
				{...register(name, options)}
				value={value}
				{...rest}
				className={className}
			/>
		</>
	)
}

export default Field
