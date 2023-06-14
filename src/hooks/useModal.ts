import { ModalContext, ModalContextType } from "@/providers/ModalProvider";
import { useContext } from "react";

export const useModal = () => useContext(ModalContext) as ModalContextType