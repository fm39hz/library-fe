export interface FormModalProps {
    record: any;
    fields: { key: string; title: string }[];
    open: boolean;
    onClose: () => void;
    onSave: (values: any) => any;
}