import TextareaAutosize from 'react-textarea-autosize'

import Button from '@/components/ui/button/Button'
import Field from '@/components/ui/field/Field'
import ImageField from '@/components/ui/field/image-field/ImageField'

import { IContentPost } from '../ContentPost.interface'

import styles from './ContentPostForm.module.scss'

const ContentPostForm = ({
	typeButton,
	handleSubmit,
	onSubmit,
	register,
	changeContent,
	changeFieldAndTextarea,
	previewImage,
	setPreviewImage,
	setImage,
	isUrlLoading,
	image,
	handlerCancelClick
}: IContentPost) => {
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

			<ImageField
				register={register}
				type='content'
				previewImage={previewImage}
				setPreviewImage={setPreviewImage}
				setImage={setImage}
				isUrlLoading={isUrlLoading}
			/>

			<div>
				{!(changeContent.heading || changeContent.mainText || image) &&
					typeButton === 'add' && <div>One field must be filled</div>}
				<Button
					type={typeButton === 'change' ? 'change' : 'add'}
					children={typeButton!}
					changeContent={changeContent}
					isLoading={isUrlLoading}
					image={image!}
				/>
				{typeButton === 'change' && (
					<Button onClick={handlerCancelClick} type='' children={'Cancel'} />
				)}
			</div>
		</form>
	)
}

export default ContentPostForm
