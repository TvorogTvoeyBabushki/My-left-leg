import {
	FieldValues,
	UseFormHandleSubmit,
	UseFormRegister
} from 'react-hook-form'

import { IDataService } from '@/services/post/post.service'

export interface IDataPost {
	heading: string
	mainText: string
	img: string
}

export interface IContentPost {
	typeButton?: string
	handleSubmit: UseFormHandleSubmit<FieldValues | IDataPost, undefined>
	onSubmit: (data: FieldValues | IDataPost) => void
	register: UseFormRegister<IDataPost | FieldValues>
	changeContent: IDataPost
	changeFieldAndTextarea: (
		e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
		type: string
	) => void
	previewImage: string
	setPreviewImage: (previewImage: string) => void
	setImage: (image: File) => void
	isUrlLoading: boolean
	image: File | null
	handlerCancelClick: () => void
	isNotFound?: boolean
	post?: IDataService | undefined
	styles?: CSSModuleClasses
	isToggleList?: boolean
	handleMouseEvent?: (type: string) => void
	indexContent?: number | null
	handleButtonClick?: () => void
	isToggleForm?: boolean
	itemsList?: string[]
	handleEdit?: (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		indexContent: number,
		item: string
	) => void
	isMutateLoading?: boolean
	content?: IDataPost
	indexPostContent?: number
	handleUploadImage: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => void
	isUploadImage: boolean
	setIsUploadImage: (isUploadImage: boolean) => void
}
