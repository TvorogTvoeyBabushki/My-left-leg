import { createContext, useState } from 'react'

interface IImageFieldProviderProps {
	children: JSX.Element
}

export interface IImageFieldContext {
	isToggleImage: boolean
	setIsToggleImage: (isToggleImage: boolean) => void
	isToggleIcon: boolean
	setIsToggleIcon: (isToggleIcon: boolean) => void
}

export const ImageFieldContext = createContext<IImageFieldContext | null>(null)

const ImageFieldProvider = ({ children }: IImageFieldProviderProps) => {
	const [isToggleImage, setIsToggleImage] = useState(false)
	const [isToggleIcon, setIsToggleIcon] = useState(false)

	return (
		<ImageFieldContext.Provider
			value={{ isToggleImage, setIsToggleImage, isToggleIcon, setIsToggleIcon }}
		>
			{children}
		</ImageFieldContext.Provider>
	)
}

export default ImageFieldProvider
