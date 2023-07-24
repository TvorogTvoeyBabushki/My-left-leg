import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'

import '@/assets/styles/global.scss'

import ModalProvider from './providers/ModalProvider'
import PostProvider from './providers/PostProvider'
import Router from '@/routes/Routes'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<PostProvider>
				<ModalProvider>
					<Router />
				</ModalProvider>
			</PostProvider>
		</QueryClientProvider>
	</React.StrictMode>
)
