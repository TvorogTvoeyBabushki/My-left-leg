import { BsThreeDotsVertical } from 'react-icons/bs'

import { useModal } from '@/hooks/useModal'

import PostService from '@/services/post/post.service'

interface IPostMenuProps {
	styles: CSSModuleClasses
	postId: number
}

const PostMenu = ({ styles, postId }: IPostMenuProps) => {
	const { setIsInteractionPost, showModal } = useModal()
	const handleClick = (e: React.MouseEvent, liElement: string = '') => {
		e.preventDefault()

		if (liElement === 'Обновить') {
			showModal()
		}

		if (liElement === 'Удалить') {
			setIsInteractionPost(true)
			PostService.delete(postId)
		}
	}
	const liElements = ['Перейти', 'Обновить', 'Удалить']

	return (
		<div className={styles.post_menu}>
			<button onClick={handleClick}>
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
