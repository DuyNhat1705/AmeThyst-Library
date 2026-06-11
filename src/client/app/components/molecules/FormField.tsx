import React from 'react';
import { Label } from '../atoms/Label';
import { Input } from '../atoms/Input';
import { ErrorMessage } from '../atoms/ErrorMessage';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
}

export const FormField: React.FC<FormFieldProps> = ({ label, error, labelProps, ...inputProps }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={inputProps.id} {...labelProps}>{label}</Label>
      <div className="relative">
        <Input {...inputProps} />
        {error && <ErrorMessage message={error} />}
      </div>
    </div>
  );
};
