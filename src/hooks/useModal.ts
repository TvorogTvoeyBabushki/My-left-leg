import { useContext } from 'react'

import { IModalContextType, ModalContext } from '@/providers/ModalProvider'

export const useModal = () => useContext(ModalContext) as IModalContextType
