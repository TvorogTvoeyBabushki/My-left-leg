import { FC, createContext, useState } from 'react'

export interface IImageFieldContext {
	isToggleImage: boolean
	setIsToggleImage: (isToggleImage: boolean) => void
	isToggleIcon: boolean
	setIsToggleIcon: (isToggleIcon: boolean) => void
}

export const ImageFieldContext = createContext<IImageFieldContext | null>(null)

const ImageFieldProvider: FC<{ children: JSX.Element }> = ({ children }) => {
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
