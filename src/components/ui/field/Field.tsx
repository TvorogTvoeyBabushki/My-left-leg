import { FieldValues, UseFormRegister } from 'react-hook-form'

interface IFieldProps {
	register: UseFormRegister<FieldValues>
	name: string
	options: {
		[x: string]: string
	}
	error?: string
	value?: string
	className: string
	placeholder?: string
	type: string
	accept?: string
	onMouseOver?: () => void
	onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void
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
					{error as string}
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
