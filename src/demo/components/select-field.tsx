import CustomSelect from "./custom-select.tsx";

type SelectFieldProps = {
    label: string,
    value: string,
    onChange: (value: string) => void,
    name: string,
    options: {
        value: string,
        label: string,
    }[]
    openDropdown: string | null,
    setOpenDropdown: (value: string | null) => void,
}

export const SelectField = ({
                                label,
                                value,
                                onChange,
                                name,
                                options,
                                setOpenDropdown,
                                openDropdown
                            }: SelectFieldProps) => (
    <div className='w-full'>
        <label className="block text-sm dark:text-darkTextMuted font-medium text-gray-700 mb-2">
            {label}
        </label>
        <CustomSelect
            value={value}
            onChange={onChange}
            options={options}
            open={openDropdown === name}
            onToggle={() => setOpenDropdown(openDropdown === name ? null : name)}
        />
    </div>
);