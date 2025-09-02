import { default as React } from 'react';
type InputFieldProps = {
    label: string;
    type?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
};
export declare const InputField: ({ label, type, value, onChange, placeholder }: InputFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
