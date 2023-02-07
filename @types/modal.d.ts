import { SetStateAction } from "react";

export interface IModalProps {
    modalVisible?: boolean,
    closeModal?: () => void,
    record: RecordType,
    image?: any,
    setModal?: SetStateAction

    isLoading?: boolean,
    onDelete?: any,
}