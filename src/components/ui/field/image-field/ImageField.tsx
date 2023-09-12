import clsx from 'clsx'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { BsPatchPlus } from 'react-icons/bs'
import { VscClose } from 'react-icons/vsc'

import Loader from '../../loader/Loader'
import { IData } from '../../modal/Modal'
import Field from '../Field'

import styles from './ImageField.module.scss'
import { useImageFieldLocal } from './useImageFieldLocal'

interface IImageFieldProps {
	type: string
	register: UseFormRegister<FieldValues>
	errors?: FieldErrors<IData>
	setImage: (image: File | null) => void
	previewImage: string
	setPreviewImage: (previewImage: string) => void
	isUrlLoading: boolean
	setIsUploadImage: (isUploadImage: boolean) => void
	setUrl?: (url: string) => void
}

const ImageField = ({
	type,
	register,
	errors,
	setImage,
	previewImage,
	setPreviewImage,
	isUrlLoading,
	setIsUploadImage,
	setUrl
}: IImageFieldProps) => {
	const { closeIcon, getImage, showIcon, isToggleIcon, isToggleImage } =
		useImageFieldLocal({
			setImage,
			setPreviewImage,
			setIsUploadImage,
			type
		})

	return (
		<div
			className={clsx(
				styles.frame,
				(type === 'content' || type === 'content-change') && styles.content
			)}
			onMouseOver={showIcon}
			onMouseOut={closeIcon}
		>
			{isToggleImage && previewImage && (
				<img src={previewImage} alt='Image-post' draggable={false} />
			)}
			<Field
				register={register}
				name='img'
				options={{
					required:
						previewImage || type === 'content' || type === 'content-change'
							? ''
							: 'Image is required'
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
			{(type === 'content' || type === 'content-change') && previewImage && (
				<button
					onClick={() => {
						setPreviewImage('')
						setIsUploadImage(false)
						setImage(null)
						setUrl!('')
					}}
					title='Delete image'
				>
					<VscClose />
				</button>
			)}
		</div>
	)
}

export default ImageField
