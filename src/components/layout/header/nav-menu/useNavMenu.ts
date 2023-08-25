import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { usePost } from '@/hooks/usePost'
import { useSearchDataPost } from '@/hooks/useSearchDataPost'

export const useNavMenu = () => {
	const { setIsSearchPost } = useSearchDataPost()
	const { setCategory } = usePost()

	const [isShowNavList, setIsShowNavList] = useState(false)
	const [clientWidth, setClientWidth] = useState(
		document.documentElement.clientWidth
	)
	const { pathname } = useLocation()
	const navigate = useNavigate()

	const sortPost = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		value: string
	) => {
		e.preventDefault()
		setIsSearchPost(true)

		pathname !== '/' && navigate('/')

		if (value === 'всё') {
			value = ''
			setIsSearchPost(false)
		}

		setCategory(value)
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
			isShowNavList,
			clientWidth,
			sortPost,
			setIsShowNavList
		}),
		[isShowNavList, clientWidth]
	)
}
