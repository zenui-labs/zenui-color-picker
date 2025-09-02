type CustomSelectProps = {
    value: string;
    onChange: (value: string) => void;
    options: {
        value: string;
        label: string;
    }[];
    open: boolean;
    onToggle: () => void;
};
declare const CustomSelect: ({ value, options, onChange, open, onToggle }: CustomSelectProps) => import("react/jsx-runtime").JSX.Element;
export default CustomSelect;
