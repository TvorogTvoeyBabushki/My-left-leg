import { useMemo, useState } from 'react'

export const useImageField = () => {
	const [isToggleImage, setIsToggleImage] = useState(false)

	return useMemo(() => ({ isToggleImage, setIsToggleImage }), [isToggleImage])
}
