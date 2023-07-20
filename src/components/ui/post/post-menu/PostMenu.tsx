import { useRef } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

interface IPostMenuProps {
	styles: CSSModuleClasses
}

const PostMenu = ({ styles }: IPostMenuProps) => {
	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault()
	}
	const liElements = ['Перейти', 'Обновить', 'Удалить']

	return (
		<div>
			<button onClick={handleClick}>
				<BsThreeDotsVertical />
			</button>
			<ul>
				{liElements.map((liElement, index) => (
					<li key={index}>
						<a href='#'>{liElement}</a>
					</li>
				))}
			</ul>
		</div>
	)
}

export default PostMenu
