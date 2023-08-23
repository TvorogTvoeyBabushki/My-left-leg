import { FC } from 'react'

import Button from '@/components/ui/button/Button'
import Field from '@/components/ui/field/Field'

import { useAdminFrom } from './useAdminForm'
import { validEmail } from '@/utils/regex'

interface IAdminForm {
	styles: CSSModuleClasses
}

const AdminForm: FC<IAdminForm> = ({ styles }) => {
	const { fieldErrors, errorResponse, handleSubmit, onHandleSubmit, register } =
		useAdminFrom()

	return (
		<form onSubmit={handleSubmit(onHandleSubmit)}>
			<Field
				register={register}
				name='email'
				options={{
					required: 'Email is required!',
					pattern: {
						value: validEmail,
						message: 'Please enter a valid email address'
					}
				}}
				error={fieldErrors.email?.message as string}
				type='text'
				placeholder='Email...'
				className={styles.field}
			/>
			<Field
				register={register}
				name='password'
				options={{
					required: 'Password is required!',
					minLength: {
						value: 6,
						message: 'Min length should more 6 symbols!'
					}
				}}
				error={fieldErrors.password?.message as string}
				type='password'
				placeholder='Password...'
				className={styles.field}
			/>
			<div>
				<Button type='login'>Login</Button>
				{errorResponse && <span>{errorResponse}</span>}
			</div>
		</form>
	)
}

export default AdminForm
