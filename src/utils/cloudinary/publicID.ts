export const publicID = (img: string[]) => {
	return img
		.join('')
		.split('')
		.reverse()
		.join('')
		.replace(/\/.+/, '')
		.replace('gpj.', '')
		.split('')
		.reverse()
		.join('')
}
