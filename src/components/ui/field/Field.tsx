import { FieldValues, UseFormRegister } from 'react-hook-form'

interface IPatterProps {
	value: RegExp
	message: string
}

interface IMinLength {
	value: number
	message: string
}

interface IFieldProps {
	register: UseFormRegister<FieldValues>
	name: string
	options: {
		[x: string]: string | IPatterProps | IMinLength
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
						marginBottom:
							name === 'email' || name === 'password' ? '20px' : '10px',
						textAlign:
							name === 'email' || name === 'password' ? 'start' : 'center',
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
