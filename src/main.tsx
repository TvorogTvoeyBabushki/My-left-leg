import React from 'react'
import ReactDOM from 'react-dom/client'

import './assets/styles/global.scss'
import Router from './routes/Routes.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Router />
	</React.StrictMode>
)
