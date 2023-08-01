import { useMemo, useState } from 'react'

export const useIconField = () => {
	const [isToggleIcon, setIsToggleIcon] = useState(true)

	return useMemo(() => ({ isToggleIcon, setIsToggleIcon }), [isToggleIcon])
}
