type SelectFieldProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    name: string;
    options: {
        value: string;
        label: string;
    }[];
    openDropdown: string | null;
    setOpenDropdown: (value: string | null) => void;
};
export declare const SelectField: ({ label, value, onChange, name, options, setOpenDropdown, openDropdown }: SelectFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
