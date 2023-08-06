import ImageField from '../../field/image-field/ImageField'
import { IModalProps } from '../Modal'

import ModalFormItem from './modal-form-item/ModalFormItem'
import { useModalForm } from './useModalForm'

const ModalForm = ({
	closeModal,
	setIsInteractionPost,
	styles
}: IModalProps) => {
	const {
		handleSubmit,
		onSubmit,
		errors,
		previewImage,
		register,
		setImage,
		setPreviewImage,
		isUrlLoading,
		changeFieldAndTextarea,
		control,
		categorys,
		fieldValue,
		isChangePost,
		textareaValue,
		setIsLoadImg
	} = useModalForm({ closeModal, setIsInteractionPost })

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles!.form}>
			<ImageField
				type='post'
				errors={errors}
				previewImage={previewImage}
				register={register}
				setImage={setImage}
				setPreviewImage={setPreviewImage}
				isUrlLoading={isUrlLoading}
			/>

			<ModalFormItem
				changeFieldAndTextarea={changeFieldAndTextarea}
				control={control}
				errors={errors}
				fieldValue={fieldValue}
				categorys={categorys}
				isChangePost={isChangePost}
				isUrlLoading={isUrlLoading}
				register={register}
				styles={styles}
				textareaValue={textareaValue}
				setIsLoadImg={setIsLoadImg}
			/>
		</form>
	)
}

export default ModalForm
