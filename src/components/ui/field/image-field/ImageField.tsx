import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { BsPatchPlus } from 'react-icons/bs'

import Loader from '../../loader/Loader'
import { IData } from '../../modal/Modal'
import Field from '../Field'

import styles from './ImageField.module.scss'
import { useImageFieldLocal } from './useImageFieldLocal'

interface IImageFieldProps {
	type: string
	register: UseFormRegister<FieldValues>
	errors?: FieldErrors<IData>
	setImage: (image: File) => void
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
	const { closeIcon, getImage, showIcon, isToggleIcon, isToggleImage } =
		useImageFieldLocal({
			setImage,
			setPreviewImage
		})

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
					<Loader type='' />
				</div>
			)}
		</div>
	)
}

export default ImageField
