import { useRef } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import { useModal } from '@/hooks/useModal'
import { usePost } from '@/hooks/usePost'

import PostService, { IDataService } from '@/services/post/post.service'

interface IPostMenuProps {
	styles: CSSModuleClasses
	post: IDataService
}

const PostMenu = ({ styles, post }: IPostMenuProps) => {
	const { setIsInteractionPost, setPost } = usePost()
	const { showModal } = useModal()
	const navigate = useNavigate()
	const postButtonRef = useRef<HTMLButtonElement | null>(null)

	const handleClick = (e: React.MouseEvent, liElement: string = '') => {
		e.preventDefault()

		if (liElement === 'Перейти') {
			navigate(`/${post.title}/${post.id}`)
		}

		if (liElement === 'Обновить') {
			showModal()
			setPost(post)
		}

		if (liElement === 'Удалить') {
			setIsInteractionPost(true)
			PostService.delete(post.id!)
		}
	}

	const liElements = ['Перейти', 'Обновить', 'Удалить']

	const handleMouseEvent = (type: string) => {
		const postButtonElement = postButtonRef.current as HTMLButtonElement

		type === 'over'
			? postButtonElement.classList.add(styles.active)
			: postButtonElement.classList.remove(styles.active)
	}

	return (
		<>
			<div
				className={styles.post_menu}
				onMouseOver={() => handleMouseEvent('over')}
				onMouseOut={() => handleMouseEvent('out')}
			>
				<button ref={postButtonRef} onClick={handleClick}>
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
		</>
	)
}

export default PostMenu
