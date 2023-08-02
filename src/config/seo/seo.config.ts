import { SITE_NAME } from '@/constants/SITE_NAME'

export const getTitle = (type: string, title?: string) => {
	return (document.title =
		type === 'home' ? SITE_NAME : `${title} | ${SITE_NAME}`)
}
