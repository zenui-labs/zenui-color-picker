import React from "react";

type InputFieldProps = {
    label: string,
    type?: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder?: string,
}

export const InputField = ({label, type = "text", value, onChange, placeholder}: InputFieldProps) => (
    <div className='w-full h-full'>
        <label className="block text-sm dark:text-darkTextMuted font-medium text-gray-700 mb-2">
            {label}
        </label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full p-2 border dark:text-darkTextMuted dark:border-darkBorder border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
        />
    </div>
);