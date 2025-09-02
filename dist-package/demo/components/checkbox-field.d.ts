import { default as React } from 'react';
type CheckFieldProps = {
    id: string;
    label: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export declare const CheckboxField: ({ id, label, checked, onChange }: CheckFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
