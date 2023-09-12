import clsx from 'clsx'

import { IDataPost } from '@/components/screens/content-post/ContentPost.interface'

import styles from './Button.module.scss'

interface IButtonProps {
	children: JSX.Element | string
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	type: string
	isLoading?: boolean
	changeContent?: IDataPost
	image?: File
	isUploadImage?: boolean
}

const Button = ({
	children,
	onClick,
	type = '',
	isLoading,
	changeContent,
	image,
	isUploadImage
}: IButtonProps) => {
	return (
		<button
			className={clsx(styles.button, {
				[styles.create_post]: type === 'create-post',
				[styles.modal]: type === 'upload' || type === 'create post',
				[styles.add_content]: type === 'add content',
				[styles.login]: type === 'login'
			})}
			onClick={onClick}
			disabled={
				isLoading ||
				(!(changeContent?.heading || changeContent?.mainText || image) &&
					(type === 'add' || type === 'change')) ||
				(isUploadImage && type === 'upload') ||
				(!isUploadImage && type === 'create post') ||
				(!isUploadImage && type === 'upload content') ||
				(isUploadImage &&
					type === 'add' &&
					!(changeContent?.heading || changeContent?.mainText))
					? true
					: false
			}
		>
			{children}
		</button>
	)
}

export default Button
