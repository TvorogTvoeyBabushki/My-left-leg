import React from 'react'
import ReactDOM from 'react-dom/client'

import '@/assets/styles/global.scss'

import ModalProvider from './providers/ModalProvider'
import Router from '@/routes/Routes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ModalProvider>
			<Router />
		</ModalProvider>
	</React.StrictMode>
)
