import { BsThreeDotsVertical } from 'react-icons/bs'
import { Link } from 'react-router-dom'

interface IPostMenuProps {
	styles: CSSModuleClasses
}

const PostMenu = ({ styles }: IPostMenuProps) => {
	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault()
	}
	const liElements = ['Перейти', 'Обновить', 'Удалить']

	// const deletePost = () => {

	// }

	return (
		<div className={styles.post_menu}>
			<button onClick={handleClick}>
				<BsThreeDotsVertical />
			</button>

			<ul>
				{liElements.map((liElement, index) => (
					<li key={index}>
						<button>{liElement}</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default PostMenu
