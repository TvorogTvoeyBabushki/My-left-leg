import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'

import '@/assets/styles/global.scss'

import AdminProvider from './providers/AdminProvider'
import ImageFieldProvider from './providers/ImageFieldProvider'
import ModalProvider from './providers/ModalProvider'
import PostProvider from './providers/PostProvider'
import SearchDataPostProvider from './providers/SearchDataPostProvider'
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
			<AdminProvider>
				<SearchDataPostProvider>
					<PostProvider>
						<ModalProvider>
							<ImageFieldProvider>
								<Router />
							</ImageFieldProvider>
						</ModalProvider>
					</PostProvider>
				</SearchDataPostProvider>
			</AdminProvider>
		</QueryClientProvider>
	</React.StrictMode>
)
