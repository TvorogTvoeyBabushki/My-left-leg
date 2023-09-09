import TextareaAutosize from 'react-textarea-autosize'

import Button from '@/components/ui/button/Button'
import Field from '@/components/ui/field/Field'
import ImageField from '@/components/ui/field/image-field/ImageField'

import { IContentPost } from '../ContentPost.interface'

import styles from './ContentPostForm.module.scss'

const ContentPostForm = ({ typeButton, ...contentProps }: IContentPost) => {
	return (
		<form
			className={styles.form}
			onSubmit={contentProps.handleSubmit(contentProps.onSubmit)}
		>
			<Field
				register={contentProps.register}
				name='heading'
				options={{ required: '' }}
				type='text'
				placeholder='Post heading...'
				className={styles.field_heading}
				value={contentProps.changeContent?.heading}
				onInput={(e: React.FormEvent<HTMLInputElement>) =>
					contentProps.changeFieldAndTextarea(e, 'field')
				}
			/>

			<TextareaAutosize
				{...contentProps.register('mainText', { required: '' })}
				name='mainText'
				placeholder='Main text...'
				className={styles.main_text}
				value={contentProps.changeContent?.mainText}
				onInput={e => contentProps.changeFieldAndTextarea(e, 'textarea')}
			/>

			<ImageField
				register={contentProps.register}
				type='content'
				previewImage={contentProps.previewImage}
				setPreviewImage={contentProps.setPreviewImage}
				setImage={contentProps.setImage}
				isUrlLoading={contentProps.isUrlLoading}
				setIsUploadImage={contentProps.setIsUploadImage}
			/>

			<div>
				{!(
					contentProps.changeContent.heading ||
					contentProps.changeContent.mainText ||
					contentProps.image
				) &&
					typeButton === 'add' && <div>One field must be filled</div>}
				<Button
					type='upload content'
					children='upload image'
					isLoading={contentProps.isUrlLoading}
					isUploadImage={contentProps.isUploadImage}
					onClick={contentProps.handleUploadImage}
				/>
				<Button
					type={typeButton === 'change' ? 'change' : 'add'}
					children={typeButton!}
					changeContent={contentProps.changeContent}
					isLoading={contentProps.isUrlLoading}
					image={contentProps.image!}
					isUploadImage={contentProps.isUploadImage}
				/>
				{typeButton === 'change' && (
					<Button
						onClick={contentProps.handlerCancelClick}
						type=''
						children={'Cancel'}
					/>
				)}
			</div>
		</form>
	)
}

export default ContentPostForm
