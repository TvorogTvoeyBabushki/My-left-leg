import clsx from 'clsx'
import { Controller } from 'react-hook-form'
import Select from 'react-select'
import TextareaAutosize from 'react-textarea-autosize'

import Button from '@/components/ui/button/Button'
import Field from '@/components/ui/field/Field'

import { ICategorys } from '../../Modal'

import { IModalFormItemProps } from './ModalFormItem.interface'
import { selectOptions } from '@/constants/selectOptions'

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
	handleUploadImage,
	isUploadImage
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
								margin: '10px 0 0',
								textAlign: 'center',
								color: 'red'
							}}
						>
							{errors.description.message as string}
						</div>
					)}
					<div
						className={clsx(styles!.counter, {
							[styles!.max_amount]: textareaValue.length === 200
						})}
					>{`${textareaValue.length}/200`}</div>
					<TextareaAutosize
						{...register('description', {
							required: textareaValue ? false : 'Description is required'
						})}
						placeholder='Post description...'
						name='description'
						maxLength={200}
						className='text-area'
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
								selectOption => selectOption.value !== 'всё'
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
					onClick={handleUploadImage}
					type='upload'
					isLoading={isUrlLoading}
					isUploadImage={isUploadImage}
				>
					Upload image
				</Button>
				<Button
					type='create post'
					isLoading={isUrlLoading}
					isUploadImage={isUploadImage}
				>
					{!isChangePost ? 'Update post' : 'Create post'}
				</Button>
			</div>
		</div>
	)
}

export default ModalFormItem
