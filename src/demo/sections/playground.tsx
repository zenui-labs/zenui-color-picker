import React, {useState} from 'react';
import {Code, Eye, Settings} from 'lucide-react';
import {ColorPicker} from "../../lib";

export const Playground = () => {
    const [selectedColor, setSelectedColor] = useState('#3B82F6');
    const [format, setFormat] = useState('hex');
    const [variant, setVariant] = useState('hue-box');
    const [theme, setTheme] = useState('light');
    const [size, setSize] = useState('md');
    const [disabled, setDisabled] = useState(false);
    const [inline, setInline] = useState(true);
    const [title, setTitle] = useState('Color Picker');
    const [showAlpha, setShowAlpha] = useState(false);
    const [showEyeDropper, setShowEyeDropper] = useState(false);
    const [showHistory, setShowHistory] = useState(true);
    const [showFormats, setShowFormats] = useState(true);
    const [showCopyButton, setShowCopyButton] = useState(true);
    const [showPresets, setShowPresets] = useState(true);
    const [enableHueSlider, setEnableHueSlider] = useState(true);
    const [enableFavorite, setEnableFavorite] = useState(false);
    const [enableShuffle, setEnableShuffle] = useState(false);
    const [maxHistory, setMaxHistory] = useState(10);
    const [brandColor, setBrandColor] = useState('#3B82F6');
    const [showCode, setShowCode] = useState(false);

    const generateCode = () => {
        const props = [
            `value="${selectedColor}"`,
            `format="${format}"`,
            `variant="${variant}"`,
            `theme="${theme}"`,
            `size="${size}"`,
            disabled && `disabled={${disabled}}`,
            inline && `inline={${inline}}`,
            title !== 'Color Picker' && `title="${title}"`,
            showAlpha && `showAlpha={${showAlpha}}`,
            showEyeDropper && `showEyeDropper={${showEyeDropper}}`,
            !showHistory && `showHistory={${showHistory}}`,
            !showFormats && `showFormats={${showFormats}}`,
            !showCopyButton && `showCopyButton={${showCopyButton}}`,
            !showPresets && `showPresets={${showPresets}}`,
            !enableHueSlider && `enableHueSlider={${enableHueSlider}}`,
            enableFavorite && `enableFavorite={${enableFavorite}}`,
            enableShuffle && `enableShuffle={${enableShuffle}}`,
            maxHistory !== 10 && `maxHistory={${maxHistory}}`,
            brandColor !== '#3B82F6' && `brandColor="${brandColor}"`
        ].filter(Boolean);

        return `<ColorPicker
  ${props.join('\n  ')}
  onChange={(color, format) => {
    console.log('Selected color:', color);
    console.log('Format:', format);
    // Your color handling logic here
  }}
  onFormatChange={(format) => {
    console.log('Format changed to:', format);
  }}
  onOpen={() => {
    console.log('Color picker opened');
  }}
  onClose={() => {
    console.log('Color picker closed');
  }}
/>`;
    };

    const ConfigSection = ({title, children}) => (
        <div className="dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center mb-4">
                <Settings className="w-5 h-5 text-blue-600 mr-2"/>
                <h3 className="text-lg font-semibold dark:text-darkText text-gray-900">{title}</h3>
            </div>
            <div className="space-y-6 mt-5">
                {children}
            </div>
        </div>
    );

    const SelectField = ({label, value, onChange, options}) => (
        <div className='w-full'>
            <label className="block text-sm dark:text-darkTextMuted font-medium text-gray-700 mb-2">
                {label}
            </label>
            <select
                value={value}
                onChange={onChange}
                className="w-full p-2 border dark:border-darkBorder dark:text-darkTextMuted border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );

    const CheckboxField = ({id, label, checked, onChange}) => (
        <div className="flex items-center">
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={onChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor={id} className="ml-2 dark:text-darkTextMuted text-sm font-medium text-gray-700">
                {label}
            </label>
        </div>
    );

    const InputField = ({label, type = "text", value, onChange, placeholder}) => (
        <div className='w-full h-full'>
            <label className="block text-sm dark:text-darkTextMuted font-medium text-gray-700 mb-2">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full p-2 border dark:text-darkTextMuted dark:border-darkBorder border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );

    return (
        <section id='playground' className="pt-10 pb-20 max-w-[1200px] relative mx-auto px-4">
            <div className="text-center">
                <h2 className="text-[2.5rem] dark:text-darkText font-bold text-gray-900 mb-2">
                    Interactive Playground
                </h2>
                <p className="text-lg dark:text-darkTextMuted text-gray-600 max-w-2xl mx-auto">
                    Experiment with different configurations and see how the color picker adapts to your needs.
                </p>
            </div>

            <div className="flex justify-between gap-[100px] mt-12">
                {/* Configuration Panel */}
                <div className="space-y-6 flex-1 min-w-[400px]">
                    <ConfigSection title="Basic Configuration">
                        <div className='flex gap-5'>
                            <SelectField
                                label="Color Format"
                                value={format}
                                onChange={(e) => setFormat(e.target.value)}
                                options={[
                                    {value: 'hex', label: 'HEX (#ffffff)'},
                                    {value: 'rgb', label: 'RGB (rgb(255, 255, 255))'},
                                    {value: 'hsl', label: 'HSL (hsl(0, 0%, 100%))'},
                                    {value: 'hsv', label: 'HSV (hsv(0, 0%, 100%))'},
                                    {value: 'cmyk', label: 'CMYK (cmyk(0, 0, 0, 0))'}
                                ]}
                            />

                            <SelectField
                                label="Variant"
                                value={variant}
                                onChange={(e) => setVariant(e.target.value)}
                                options={[
                                    {value: 'wheel', label: 'Color Wheel'},
                                    {value: 'hue-slider', label: 'Hue Slider'},
                                    {value: 'advance', label: 'Advanced'},
                                    {value: 'hue-box', label: 'Hue Box'}
                                ]}
                            />
                        </div>

                        <div className='flex gap-5'>
                            <SelectField
                                label="Theme"
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                                options={[
                                    {value: 'light', label: 'Light Theme'},
                                    {value: 'dark', label: 'Dark Theme'}
                                ]}
                            />

                            <SelectField
                                label="Size"
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                options={[
                                    {value: 'sm', label: 'Small'},
                                    {value: 'md', label: 'Medium'},
                                    {value: 'lg', label: 'Large'}
                                ]}
                            />
                        </div>

                        <div className='flex gap-5'>
                            <InputField
                                label="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter color picker title"
                            />

                            <InputField
                                label="Brand Color"
                                type="color"
                                value={brandColor}
                                onChange={(e) => setBrandColor(e.target.value)}
                            />
                        </div>
                    </ConfigSection>

                    <ConfigSection title="Display Options">
                        <div className="grid grid-cols-3 gap-y-5">
                            <CheckboxField
                                id="disabled"
                                label="Disabled"
                                checked={disabled}
                                onChange={(e) => setDisabled(e.target.checked)}
                            />

                            <CheckboxField
                                id="inline"
                                label="Inline Display"
                                checked={inline}
                                onChange={(e) => setInline(e.target.checked)}
                            />

                            <CheckboxField
                                id="showAlpha"
                                label="Show Alpha Channel"
                                checked={showAlpha}
                                onChange={(e) => setShowAlpha(e.target.checked)}
                            />

                            <CheckboxField
                                id="showEyeDropper"
                                label="Show Eye Dropper"
                                checked={showEyeDropper}
                                onChange={(e) => setShowEyeDropper(e.target.checked)}
                            />

                            <CheckboxField
                                id="showHistory"
                                label="Show Color History"
                                checked={showHistory}
                                onChange={(e) => setShowHistory(e.target.checked)}
                            />

                            <CheckboxField
                                id="showFormats"
                                label="Show Format Switcher"
                                checked={showFormats}
                                onChange={(e) => setShowFormats(e.target.checked)}
                            />

                            <CheckboxField
                                id="showCopyButton"
                                label="Show Copy Button"
                                checked={showCopyButton}
                                onChange={(e) => setShowCopyButton(e.target.checked)}
                            />

                            <CheckboxField
                                id="showPresets"
                                label="Show Color Presets"
                                checked={showPresets}
                                onChange={(e) => setShowPresets(e.target.checked)}
                            />

                            <CheckboxField
                                id="enableHueSlider"
                                label="Enable Hue Slider"
                                checked={enableHueSlider}
                                onChange={(e) => setEnableHueSlider(e.target.checked)}
                            />

                            <CheckboxField
                                id="enableFavorite"
                                label="Enable Favorites"
                                checked={enableFavorite}
                                onChange={(e) => setEnableFavorite(e.target.checked)}
                            />

                            <CheckboxField
                                id="enableShuffle"
                                label="Enable Shuffle"
                                checked={enableShuffle}
                                onChange={(e) => setEnableShuffle(e.target.checked)}
                            />
                        </div>

                        <InputField
                            label="Max History Items"
                            type="number"
                            value={maxHistory}
                            onChange={(e) => setMaxHistory(parseInt(e.target.value) || 10)}
                            placeholder="10"
                        />
                    </ConfigSection>

                    <div className="dark:bg-gray-900 rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <Code className="w-5 h-5 text-blue-600 mr-2"/>
                                <h3 className="text-lg dark:text-darkText font-semibold text-gray-900">Generated
                                    Code</h3>
                            </div>
                            <button
                                onClick={() => setShowCode(!showCode)}
                                className="flex items-center px-3 py-1 text-sm text-blue-600 dark:hover:bg-gray-800 cursor-pointer hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                <Eye className="w-4 h-4 mr-1"/>
                                {showCode ? 'Hide' : 'Show'}
                            </button>
                        </div>

                        {showCode && (
                            <pre
                                className="p-4 bg-gray-900 dark:bg-gray-800 text-gray-300 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
                {generateCode()}
              </pre>
                        )}
                    </div>
                </div>

                {/* Live Preview */}
                <div className="lg:sticky lg:top-8">
                    <ColorPicker
                        value={selectedColor}
                        format={format}
                        variant={variant}
                        theme={theme}
                        size={size}
                        disabled={disabled}
                        inline={inline}
                        title={title}
                        showAlpha={showAlpha}
                        showEyeDropper={showEyeDropper}
                        showHistory={showHistory}
                        showFormats={showFormats}
                        showCopyButton={showCopyButton}
                        showPresets={showPresets}
                        enableHueSlider={enableHueSlider}
                        enableFavorite={enableFavorite}
                        enableShuffle={enableShuffle}
                        maxHistory={maxHistory}
                        inline
                        popupStyle={"border-gray-200 w-[420px]"}
                        brandColor={brandColor}
                        onChange={(color, format) => {
                            setSelectedColor(color.hex);
                            console.log('Color changed:', color, format);
                        }}
                        onFormatChange={(newFormat) => {
                            setFormat(newFormat);
                            console.log('Format changed:', newFormat);
                        }}
                        onOpen={() => console.log('Color picker opened')}
                        onClose={() => console.log('Color picker closed')}
                    />
                </div>
            </div>
        </section>
    );
};

export default Playground;