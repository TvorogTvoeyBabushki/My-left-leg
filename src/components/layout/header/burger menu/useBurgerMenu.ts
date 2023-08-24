import { useEffect, useMemo, useState } from 'react'

export const useBurgerMenu = (
	isShowNavList: boolean,
	setIsShowNavList: (isShowNavList: boolean) => void
) => {
	const [isShow, seIsShow] = useState(false)
	const [clientWidth, setClientWidth] = useState(
		document.documentElement.clientWidth
	)

	const handleClick = () => {
		seIsShow(!isShow)
		isShowNavList ? setIsShowNavList(false) : setIsShowNavList(true)
	}

	useEffect(() => {
		window.addEventListener('resize', () => {
			setClientWidth(document.documentElement.clientWidth)
		})

		return () =>
			window.removeEventListener('resize', () => {
				setClientWidth(document.documentElement.clientWidth)
			})
	}, [])

	return useMemo(
		() => ({
			clientWidth,
			isShow,
			handleClick
		}),
		[clientWidth, isShow]
	)
}
