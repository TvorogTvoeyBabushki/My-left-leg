import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'

import Button from '@/components/ui/button/Button'
import Field from '@/components/ui/field/Field'

import { IDataPost } from '../ContentPost'

import styles from './ContentPostForm.module.scss'

interface IContentPostFormProps {
	handleSubmit: UseFormHandleSubmit<IDataPost, undefined>
	onSubmit: (data: IDataPost) => void
	register: UseFormRegister<IDataPost>
	changeContent: IDataPost
	changeFieldAndTextarea: (
		e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>,
		type: string
	) => void
	handlerCancelClick: () => void
	typeButton: string
}

const ContentPostForm = ({
	handleSubmit,
	onSubmit,
	register,
	changeContent,
	changeFieldAndTextarea,
	handlerCancelClick,
	typeButton
}: IContentPostFormProps) => {
	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<Field
				register={register}
				name='heading'
				options={{ required: '' }}
				type='text'
				placeholder='Post heading...'
				className={styles.field_heading}
				value={changeContent?.heading}
				onInput={(e: React.FormEvent<HTMLInputElement>) =>
					changeFieldAndTextarea(e, 'field')
				}
			/>

			<TextareaAutosize
				{...register('mainText', { required: '' })}
				name='mainText'
				placeholder='Main text...'
				className={styles.main_text}
				value={changeContent?.mainText}
				onInput={e => changeFieldAndTextarea(e, 'textarea')}
			/>

			<div>
				{!(changeContent.heading || changeContent.mainText) &&
					typeButton === 'add' && <div>One field must be filled</div>}
				<Button
					type={typeButton === 'change' ? 'change' : 'add'}
					children={
						typeButton === 'change' &&
						!(changeContent.heading || changeContent.mainText)
							? 'delete'
							: typeButton
					}
					changeContent={changeContent}
				/>
				{typeButton === 'change' && (
					<Button onClick={handlerCancelClick} type='' children={'Cancel'} />
				)}
			</div>
		</form>
	)
}

export default ContentPostForm
