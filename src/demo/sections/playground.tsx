import {useMemo, useRef, useState} from "react";
import {Code, Eye, Settings} from "lucide-react";
import {ColorFormat, ColorPicker} from "../../package";
import {InputField} from "../components/input-field.tsx";
import {CheckboxField} from "../components/checkbox-field.tsx";
import {SelectField} from "../components/select-field.tsx";
import {ColorPickerVariant, Themes} from "../../package/types.ts";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {atomDark} from "react-syntax-highlighter/dist/esm/styles/prism";

const formatOptions = [
    {value: "hex", label: "HEX (#ffffff)"},
    {value: "rgb", label: "RGB (rgb(255, 255, 255))"},
    {value: "hsl", label: "HSL (hsl(0, 0%, 100%))"},
    {value: "hsv", label: "HSV (hsv(0, 0%, 100%))"},
    {value: "cmyk", label: "CMYK (cmyk(0, 0, 0, 0))"},
];

const variantOptions = [
    {value: "wheel", label: "Color Wheel"},
    {value: "hue-slider", label: "Hue Slider"},
    {value: "hue-box", label: "Hue Box"},
];

const themeOptions = [
    {value: "light", label: "Light Theme"},
    {value: "dark", label: "Dark Theme"},
];

export const Playground = () => {
    const [selectedColor, setSelectedColor] = useState("#3B82F6");
    const [format, setFormat] = useState<ColorFormat>("hex");
    const [variant, setVariant] = useState<ColorPickerVariant>("hue-box");
    const [theme, setTheme] = useState<Themes>("light");
    const [title, setTitle] = useState("Color Picker");
    const [brandColor, setBrandColor] = useState("#3B82F6");
    const [copied, setCopied] = useState(false);
    const brandColorButtonRef = useRef<HTMLDivElement>(null);
    const [maxHistory, setMaxHistory] = useState(10);

    const [toggles, setToggles] = useState({
        showTitle: false,
        disabled: false,
        inline: true,
        showAlpha: false,
        showHistory: true,
        showFormats: true,
        showCopyButton: true,
        showPresets: true,
        enableHueSlider: true,
        enableFavorite: false,
        enableShuffle: false,
    });

    const [showCode, setShowCode] = useState(true);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleToggle = (key: keyof typeof toggles) =>
        setToggles((prev) => ({...prev, [key]: !prev[key]}));

    const generatedCode = useMemo(() => {
        const props = [
            `value="${selectedColor}"`,
            `format="${format}"`,
            `variant="${variant}"`,
            `theme="${theme}"`,
            `showTitle={${toggles.showTitle}}`,
            `maxHistory={${maxHistory}}`,
            toggles.disabled && `disabled={true}`,
            toggles.inline && `inline={true}`,
            title !== "Color Picker" && `title="${title}"`,
            toggles.showAlpha && `showAlpha={true}`,
            !toggles.showHistory && `showHistory={false}`,
            !toggles.showFormats && `showFormats={false}`,
            !toggles.showCopyButton && `showCopyButton={false}`,
            !toggles.showPresets && `showPresets={false}`,
            !toggles.enableHueSlider && `enableHueSlider={false}`,
            toggles.enableFavorite && `enableFavorite={true}`,
            toggles.enableShuffle && `enableShuffle={true}`,
            brandColor !== "#3B82F6" && `brandColor="${brandColor}"`,
        ].filter(Boolean);

        return `<ColorPicker
  ${props.join("\n  ")}
  onChange={(color, format) => {
    console.log('Selected color:', color);
    console.log('Format:', format);
  }}
  onFormatChange={(format) => console.log('Format changed to:', format)}
  onOpen={() => console.log('Color picker opened')}
  onClose={() => console.log('Color picker closed')}
/>`;
    }, [selectedColor, format, variant, theme, toggles, title, brandColor]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(generatedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }

    return (
        <section id="playground" className="pt-10 pb-20 max-w-[1200px] mx-auto px-6 lg:px-0">
            <div className="text-center">
                <h2 className="text-[2.5rem] font-bold dark:text-darkText text-gray-900 mb-2">
                    Interactive Playground
                </h2>
                <p className="text-base lg:text-lg dark:text-darkTextMuted text-gray-600 max-w-2xl mx-auto">
                    Experiment with different configurations and see how the color picker adapts to your needs.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-[50px] lg:gap-[100px] mt-12">
                <div className="space-y-6 flex-1 w-full lg:min-w-[400px]">
                    <div className="dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6">
                        <div className="flex items-center mb-4">
                            <Settings className="w-6 h-6 text-accent mr-2"/>
                            <h3 className="text-lg font-semibold dark:text-darkText text-gray-900">Configuration</h3>
                        </div>

                        <div className="space-y-6 mt-5">
                            <div className="flex flex-col lg:flex-row gap-5">
                                <SelectField
                                    label="Color Format"
                                    name="format"
                                    value={format}
                                    options={formatOptions}
                                    openDropdown={openDropdown}
                                    setOpenDropdown={setOpenDropdown}
                                    onChange={(val) => setFormat(val as ColorFormat)}
                                />

                                <SelectField
                                    label="Variant"
                                    name="variant"
                                    value={variant}
                                    options={variantOptions}
                                    openDropdown={openDropdown}
                                    setOpenDropdown={setOpenDropdown}
                                    onChange={(val) => setVariant(val as ColorPickerVariant)}
                                />
                            </div>

                            <div className="flex flex-col lg:flex-row gap-5">
                                <SelectField
                                    label="Theme"
                                    name="theme"
                                    value={theme}
                                    options={themeOptions}
                                    openDropdown={openDropdown}
                                    setOpenDropdown={setOpenDropdown}
                                    onChange={(val) => setTheme(val as Themes)}
                                />

                                <InputField
                                    label="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter color picker title"
                                />
                            </div>

                            <div className='w-full flex gap-5 flex-col lg:flex-row'>
                                <div className="flex-1">
                                    <label
                                        className="block text-sm font-medium text-gray-700 mb-2 dark:text-darkTextMuted">
                                        Brand Color
                                    </label>
                                    <div
                                        ref={brandColorButtonRef}
                                        className='border flex items-center gap-3 border-gray-200 dark:border-darkBorder rounded-lg p-1'>
                                        <div className='size-8 rounded-md' style={{backgroundColor: brandColor}}></div>
                                        <p className='text-base text-gray-800 dark:text-darkTextMuted'>{brandColor || ''}</p>
                                    </div>
                                    <ColorPicker
                                        variant="hue-box"
                                        showPresets={false}
                                        showHistory={false}
                                        showAlpha={false}
                                        triggerRef={brandColorButtonRef}
                                        showCopyButton={false}
                                        showDefaultButton={false}
                                        showFormats={false}
                                        enableHueSlider={true}
                                        showTitle={false}
                                        onChange={(color) => setBrandColor(color.hex)}
                                    />
                                </div>

                                <div className="flex-1">
                                    <InputField
                                        label={'Max History'}
                                        type={'number'}
                                        value={maxHistory}
                                        onChange={(e) => setMaxHistory(Number(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center mb-6 mt-8">
                            <Settings className="w-6 h-6 text-accent mr-2"/>
                            <h3 className="text-lg font-semibold dark:text-darkText text-gray-900">Display Options</h3>
                        </div>

                        <div className="grid mt-5 grid-cols-2 lg:grid-cols-3 gap-y-5">
                            {Object.entries(toggles).map(([key, value]) => (
                                <CheckboxField
                                    key={key}
                                    id={key}
                                    label={key.replace(/([A-Z])/g, " $1").trim()}
                                    checked={value}
                                    onChange={() => handleToggle(key as keyof typeof toggles)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="dark:bg-gray-900 rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Code className="w-6 h-6 text-accent mr-2"/>
                                <h3 className="text-lg font-semibold dark:text-darkText text-gray-900">Generated
                                    Code</h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowCode(!showCode)}
                                className="flex cursor-pointer items-center px-3 py-1.5 text-sm text-accent dark:hover:bg-gray-800 hover:bg-accent/10 rounded-lg transition-colors"
                            >
                                <Eye className="w-4 h-4 mr-1"/>
                                {showCode ? "Hide" : "Show"}
                            </button>
                        </div>

                        {showCode && (
                            <div className='relative mt-4'>
                                <SyntaxHighlighter
                                    language="tsx"
                                    style={atomDark}
                                    wrapLines={true}
                                    showLineNumbers={true}
                                    customStyle={{
                                        borderRadius: "0.75rem",
                                        padding: "1rem",
                                        fontSize: "0.875rem",
                                        background: "#1e1e1e",
                                        scrollbarWidth: 'none'
                                    }}
                                >
                                    {generatedCode}
                                </SyntaxHighlighter>

                                <button
                                    onClick={handleCopy}
                                    className='absolute top-3 right-3 text-darkText bg-gray-700 px-3 py-1 cursor-pointer text-[0.9rem] rounded-lg'>{
                                    copied ? 'Copied!' : 'Copy'
                                }
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:sticky w-full lg:w-auto lg:top-8">
                    <ColorPicker
                        value={selectedColor}
                        format={format}
                        containerClasses={'w-full'}
                        variant={variant}
                        theme={theme}
                        title={title}
                        maxHistory={maxHistory}
                        brandColor={brandColor}
                        popupClasses="border-gray-200 w-full lg:w-[420px]"
                        {...toggles}
                        onChange={(color) => setSelectedColor(color.hex)}
                        onFormatChange={(newFormat) => setFormat(newFormat)}
                        onOpen={() => console.log("Color picker opened")}
                        onClose={() => console.log("Color picker closed")}
                    />
                </div>
            </div>
        </section>
    );
};

export default Playground;
