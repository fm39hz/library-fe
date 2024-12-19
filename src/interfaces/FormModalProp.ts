import { model } from "./model";

export interface FormModalFields<T extends model> {
    key: string;
    label: string;
    option?: T[];
    hidden?: boolean;
    required?: boolean;
}

export interface FormModalProps<TValue extends model, TField extends model> {
    record: unknown;
    fields: FormModalFields<TField>[];
    open: boolean;
    onClose: () => void;
    onSave: (values: TValue, isEditing: boolean) => void;
}

