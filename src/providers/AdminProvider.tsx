import Cookies from 'js-cookie'
import { FC, createContext, useEffect, useState } from 'react'

export interface IAdminContextProps {
	isAdmin: boolean
	setIsAdmin: (isAdmin: boolean) => void
}

export const AdminContext = createContext<IAdminContextProps | null>(null)

const AdminProvider: FC<{ children: JSX.Element }> = ({ children }) => {
	const [isAdmin, setIsAdmin] = useState(false)

	useEffect(() => {
		Cookies.get('admin') && setIsAdmin(true)

		return () => setIsAdmin(false)
	}, [])

	return (
		<AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
			{children}
		</AdminContext.Provider>
	)
}

export default AdminProvider
