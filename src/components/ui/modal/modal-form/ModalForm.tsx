import ImageField from '../../field/image-field/ImageField'
import { IModalProps } from '../Modal'

import ModalFormItem from './modal-form-item/ModalFormItem'
import { useModalForm } from './useModalForm'

const ModalForm = ({
	closeModal,
	setIsInteractionPost,
	styles
}: IModalProps) => {
	const modalProps = useModalForm({ closeModal, setIsInteractionPost })

	return (
		<form
			onSubmit={modalProps.handleSubmit(modalProps.onSubmit)}
			className={styles!.form}
		>
			<ImageField
				type='post'
				errors={modalProps.errors}
				previewImage={modalProps.previewImage}
				register={modalProps.register}
				setImage={modalProps.setImage}
				setPreviewImage={modalProps.setPreviewImage}
				isUrlLoading={modalProps.isUrlLoading}
				setIsUploadImage={modalProps.setIsUploadImage}
			/>

			<ModalFormItem
				changeFieldAndTextarea={modalProps.changeFieldAndTextarea}
				control={modalProps.control}
				errors={modalProps.errors}
				fieldValue={modalProps.fieldValue}
				categorys={modalProps.categorys}
				isChangePost={modalProps.isChangePost}
				isUrlLoading={modalProps.isUrlLoading}
				register={modalProps.register}
				styles={styles}
				textareaValue={modalProps.textareaValue}
				handleUploadImage={modalProps.handleUploadImage}
				isUploadImage={modalProps.isUploadImage}
			/>
		</form>
	)
}

export default ModalForm
