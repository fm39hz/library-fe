import { model } from "../../interfaces/model";

export type FormModalFields<T extends model> = {
  key: string;
  label: string;
  type?: string;
  option?: T[];
  hidden?: boolean;
  required?: boolean;
};

export type FormModalProps<TValue extends model, TField extends model> = {
  record: unknown;
  fields: FormModalFields<TField>[];
  open: boolean;
  onClose(): void;
  onSave(values: TValue, isEditing: boolean): void;
};
