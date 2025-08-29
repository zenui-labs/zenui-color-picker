import React from "react";

type CheckFieldProps = {
    id: string
    label: string
    checked: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const CheckboxField = ({id, label, checked, onChange}: CheckFieldProps) => (
    <div className="flex items-center">
        <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={onChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor={id} className="ml-2 cursor-pointer dark:text-darkTextMuted text-sm font-medium text-gray-700">
            {label}
        </label>
    </div>
);