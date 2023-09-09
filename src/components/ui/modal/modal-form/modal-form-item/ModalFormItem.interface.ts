import {
	Control,
	FieldErrors,
	FieldValues,
	UseFormRegister
} from 'react-hook-form'

import { ICategorys, IData } from '../../Modal'

export interface IModalFormItemProps {
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
	handleUploadImage: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => void
	isUploadImage: boolean
}
