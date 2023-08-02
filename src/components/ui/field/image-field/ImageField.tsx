import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { BsPatchPlus } from 'react-icons/bs'

import { useImageField } from '@/hooks/useImageField'

import { IDataPost } from '@/components/screens/content-post/ContentPost'

import Loader from '../../loader/Loader'
import { IData } from '../../modal/Modal'
import Field from '../Field'

import styles from './ImageField.module.scss'

interface IImageFieldProps {
	type: string
	register: UseFormRegister<IData> | UseFormRegister<IDataPost>
	errors?: FieldErrors<IData>
	setImage: (image: any) => void
	previewImage: string
	setPreviewImage: (previewImage: string) => void
	isUrlLoading: boolean
}

const ImageField = ({
	type,
	register,
	errors,
	setImage,
	previewImage,
	setPreviewImage,
	isUrlLoading
}: IImageFieldProps) => {
	const { setIsToggleImage, isToggleImage, isToggleIcon, setIsToggleIcon } =
		useImageField()

	const getImage = (event: any) => {
		const fileRef: File | null = event.target.files[0]

		if (fileRef) {
			setImage(fileRef)
			setIsToggleImage(true)

			const reader = new FileReader()

			reader.readAsDataURL(fileRef) // получаем url

			reader.onload = (ev: any) => {
				setPreviewImage(ev.target.result)
			}
		}
	}

	const showIcon = () => {
		setIsToggleIcon(true)
	}

	const closeIcon = () => {
		isToggleImage && setIsToggleIcon(false)
	}

	return (
		<div className={styles.frame} onMouseOver={showIcon} onMouseOut={closeIcon}>
			{isToggleImage && (
				<img src={previewImage} alt='image-post' draggable={false} />
			)}
			<Field
				register={register}
				name='img'
				options={{
					required:
						previewImage || type === 'content' ? '' : 'Image is required'
				}}
				error={errors?.img?.message as string}
				type='file'
				accept='image/*'
				onInput={getImage}
				onMouseOver={showIcon}
				className={styles.field_image}
			/>
			{isToggleIcon && !isUrlLoading && (
				<div>
					<BsPatchPlus className={styles.icon_image} fontSize='34' />
				</div>
			)}
			{isUrlLoading && (
				<div>
					<Loader />
				</div>
			)}
		</div>
	)
}

export default ImageField
