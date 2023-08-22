import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useMemo, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAdmin } from '@/hooks/useAdmin'

import { IAdminLoginProps } from './AdminForm.interface'
import AdminService from '@/services/admin/admin.service'

interface IErrorResponseProps {
	response: {
		data: {
			message: string
		}
	}
}

export const useAdminFrom = () => {
	const [errorResponse, setErrorResponse] = useState('')
	const { setIsAdmin } = useAdmin()
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors: fieldErrors }
	} = useForm<IAdminLoginProps | FieldValues>({
		mode: 'onChange'
	})

	const { mutate } = useMutation(
		['admin login'],
		(body: IAdminLoginProps) => AdminService.login(body),
		{
			onSuccess: () => {
				setIsAdmin(true)
				navigate('/')
				reset()

				Cookies.set('admin', 'admin')
			},
			onError: (error: IErrorResponseProps) => {
				setErrorResponse(error.response.data.message)
			}
		}
	)

	const onHandleSubmit = (data: IAdminLoginProps | FieldValues) => {
		mutate(data as IAdminLoginProps)
	}

	return useMemo(
		() => ({
			register,
			handleSubmit,
			fieldErrors,
			onHandleSubmit,
			errorResponse
		}),
		[fieldErrors, errorResponse]
	)
}
