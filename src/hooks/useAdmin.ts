import { useContext } from 'react'

import { AdminContext, IAdminContextProps } from '@/providers/AdminProvider'

export const useAdmin = () => useContext(AdminContext) as IAdminContextProps
