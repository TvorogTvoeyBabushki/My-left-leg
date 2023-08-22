import { IAdminLoginProps } from '@/components/screens/admin/admin-form/AdminForm.interface'

import { $axios } from '../api'

export const MANAGE = '/manage'

class AdminService {
	async login(body: IAdminLoginProps) {
		return $axios.post(`${MANAGE}/login`, body)
	}
}

export default new AdminService()
