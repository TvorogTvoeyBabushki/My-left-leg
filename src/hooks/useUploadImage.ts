import axios from 'axios'

import { cloudName } from '@/config/cloudinary/cloudName.config'
import { uploadPreset } from '@/config/cloudinary/uploadPreset.config'

interface IUploadImage {
	image: File
	setIsUrlLoading: (isUrlLoading: boolean) => void
	setUrl: (url: string) => void
	nameFolder: string
}

export const useUploadImage = async ({
	image,
	setIsUrlLoading,
	setUrl,
	nameFolder
}: IUploadImage) => {
	if (image) {
		try {
			setIsUrlLoading(true)

			const formData = new FormData()
			formData.append('file', image)
			formData.append('folder', nameFolder)
			formData.append('upload_preset', uploadPreset)
			formData.append('cloud_name', cloudName)

			const response = await axios.post(
				`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
				formData
			)

			setUrl(response.data.url)
		} catch (error) {
			console.log('error: ', error)
		} finally {
			setIsUrlLoading(false)
		}
	}
}
