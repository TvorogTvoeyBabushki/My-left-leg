import { useContext } from 'react'

import {
	IImageFieldContext,
	ImageFieldContext
} from '@/providers/ImageFieldProvider'

export const useImageField = () =>
	useContext(ImageFieldContext) as IImageFieldContext
