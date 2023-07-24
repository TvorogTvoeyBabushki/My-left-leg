import { BsThreeDotsVertical } from 'react-icons/bs'

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
	const handleClick = (e: React.MouseEvent, liElement: string = '') => {
		e.preventDefault()

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

	return (
		<>
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
		</>
	)
}

export default PostMenu
