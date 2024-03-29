import clsx from 'clsx'
import { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import { useImageField } from '@/hooks/useImageField'
import { useModal } from '@/hooks/useModal'
import { usePost } from '@/hooks/usePost'

import styles from './PostMenu.module.scss'
import PostService, { IDataService } from '@/services/post/post.service'

interface IPostMenuProps {
	post: IDataService
}

const PostMenu = ({ post }: IPostMenuProps) => {
	const [isToggleStyle, setIsToggleStyle] = useState(false)
	const navigate = useNavigate()
	const { setIsToggleIcon } = useImageField()
	const { setIsInteractionPost, setPost, setCategory, setPostHashtag } =
		usePost()
	const { showModal } = useModal()

	const handleClick = (e: React.MouseEvent, liElement: string = '') => {
		e.preventDefault()

		if (liElement === 'Перейти') {
			navigate(`/${post.title.replace(/\s/g, '-').toLowerCase()}/${post.id}`)
		}

		if (liElement === 'Обновить') {
			showModal()
			setPost(post)

			setIsToggleIcon(false)
		}

		if (liElement === 'Удалить') {
			setIsInteractionPost(true)
			PostService.delete(post.id!)
			setCategory('')
			setPostHashtag('')
		}
	}

	const liElements = ['Перейти', 'Обновить', 'Удалить']

	const handleMouseEvent = (type: string) => {
		type === 'over' ? setIsToggleStyle(true) : setIsToggleStyle(false)
	}

	return (
		<div
			className={styles.post_menu}
			onMouseOver={() => handleMouseEvent('over')}
			onMouseOut={() => handleMouseEvent('out')}
		>
			<button
				className={clsx('', {
					[styles.active]: isToggleStyle
				})}
				onClick={handleClick}
			>
				<BsThreeDotsVertical />
			</button>

			<ul>
				{liElements.map((liElement, index) => (
					<li key={index}>
						<button onClick={e => handleClick(e, liElement)}>
							{liElement}
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default PostMenu
