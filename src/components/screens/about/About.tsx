import { usePost } from '@/hooks/usePost'

import Header from '../../layout/header/Header'

const About = () => {
	const { post } = usePost()
	console.log(post)
	return (
		<div className='container'>
			<Header />
			<img src={post?.img} alt='' />
		</div>
	)
}

export default About
