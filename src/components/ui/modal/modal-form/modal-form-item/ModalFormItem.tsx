import clsx from 'clsx'
import {
	Control,
	Controller,
	FieldErrors,
	FieldValues,
	UseFormRegister
} from 'react-hook-form'
import Select from 'react-select'
import TextareaAutosize from 'react-textarea-autosize'

import Button from '@/components/ui/button/Button'
import Field from '@/components/ui/field/Field'

import { ICategorys, IData } from '../../Modal'

import { selectOptions } from '@/constants/selectOptions'

interface IModalFormItemProps {
	register: UseFormRegister<FieldValues | IData>
	fieldValue: string
	errors: FieldErrors<FieldValues | IData>
	changeFieldAndTextarea: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		type: string
	) => void
	styles: CSSModuleClasses | undefined
	textareaValue: string
	control: Control<IData | FieldValues, any>
	categorys: ICategorys[]
	isChangePost: boolean
	isUrlLoading: boolean
	setIsLoadImg: (isLoadImg: boolean) => void
}

const ModalFormItem = ({
	register,
	fieldValue,
	errors,
	changeFieldAndTextarea,
	styles,
	textareaValue,
	control,
	categorys,
	isUrlLoading,
	isChangePost,
	setIsLoadImg
}: IModalFormItemProps) => {
	return (
		<div>
			<div>
				<Field
					register={register}
					name='title'
					options={{
						required: fieldValue.trim().length ? '' : 'Title is required'
					}}
					error={errors.title?.message as string}
					onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
						changeFieldAndTextarea(e, 'field')
					}
					value={fieldValue}
					type='text'
					placeholder='Post title...'
					className={styles!.field}
				/>

				<>
					{errors.description && (
						<div
							style={{
								margin: '10px 0',
								textAlign: 'center',
								color: 'red'
							}}
						>
							{errors.description.message as string}
						</div>
					)}
					<TextareaAutosize
						{...register('description', {
							required: textareaValue ? false : 'Description is required'
						})}
						placeholder='Post description...'
						name='description'
						maxLength={200}
						className={clsx('text-area', {
							['text-area--error']: !!errors.description
						})}
						onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
							changeFieldAndTextarea(e, 'textarea')
						}
						value={textareaValue}
					/>
				</>

				<Controller
					name='categorysIds'
					control={control}
					render={({ field: { value = categorys, onChange } }) => (
						<Select
							required
							classNamePrefix='select'
							placeholder='Categorys...'
							options={selectOptions.filter(
								selectOption => selectOption.value !== 'all'
							)}
							onChange={onChange}
							value={value as ICategorys[]}
							isMulti
						/>
					)}
				/>
			</div>

			<div>
				<Button
					onClick={e => {
						setIsLoadImg(true)
					}}
					type='modal'
					isLoading={isUrlLoading}
				>
					{!isChangePost ? 'Update post' : 'Create post'}
				</Button>
			</div>
		</div>
	)
}

export default ModalFormItem
