import { useMemo } from 'react'

import { useImageField } from '@/hooks/useImageField'

interface IUseImageFieldProps {
	setImage: (image: File) => void
	setPreviewImage: (previewImage: string) => void
	setIsUploadImage: (isUploadImage: boolean) => void
	type: string
}

export const useImageFieldLocal = ({
	setImage,
	setPreviewImage,
	setIsUploadImage,
	type
}: IUseImageFieldProps) => {
	const { setIsToggleImage, isToggleImage, isToggleIcon, setIsToggleIcon } =
		useImageField()

	const getImage = (event: React.ChangeEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement
		const fileRef = target.files?.[0] as File

		if (fileRef) {
			setImage(fileRef)
			setIsToggleImage(true)
			type === 'content' ? setIsUploadImage(true) : setIsUploadImage(false)

			const reader = new FileReader()

			reader.readAsDataURL(fileRef) // получаем url

			reader.onload = ev => {
				setPreviewImage(ev.target!.result as string)
			}
		}
	}

	const showIcon = () => {
		setIsToggleIcon(true)
	}

	const closeIcon = () => {
		isToggleImage && setIsToggleIcon(false)
	}

	return useMemo(
		() => ({ getImage, showIcon, closeIcon, isToggleIcon, isToggleImage }),
		[isToggleIcon, isToggleImage]
	)
}
