import { Link } from 'react-router-dom'

const Header = () => {
	return (
		<div className='container'>
			<nav>
				<Link to='/'>Home</Link>
				<Link to='/about'>About</Link>
			</nav>
		</div>
	)
}

export default Header
