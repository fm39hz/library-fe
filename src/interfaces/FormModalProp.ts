import { model } from "./model";

export interface FormModalFields<T extends model> {
    key: string;
    label: string;
    option?: T[];
    hidden?: boolean;
    required?: boolean
}

export interface FormModalProps<T extends model> {
    record: any;
    fields: FormModalFields<T>[];
    open: boolean;
    onClose: () => void;
    onSave: (values: any, isEditing: boolean) => any;
}