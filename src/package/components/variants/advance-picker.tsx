import {HueBox} from "./hue-box.tsx";
import {colorToValue, parseColor} from "../../utils/colorUtils.ts";
import {ColorFormat, ColorValue} from "../../types.ts";
import {ColorInput} from "../ColorInput.tsx";
import {ColorSlider} from "./ColorSlider.tsx";
import {BrightnessSlider} from "../BrightnessSlider.tsx";
import FormatSelect from "../FormatSelect.tsx";

type AdvancePickerProps = {
    presetColors?: string[],
    favoriteColors?: ColorValue[],
    colorHistory?: ColorValue[],
    handleColorChange: (color: ColorValue) => void,
    addToFavorites: (color: ColorValue) => void,
    removeFromFavorites: (color: ColorValue) => void,
    currentHue: number,
    currentColor: ColorValue,
    setCurrentHue: (hue: number) => void,
    theme?: 'light' | 'dark',
    showFormats?: boolean,
    currentFormat?: ColorFormat,
    currentColorString?: string,
    handleFormatChange?: (newFormat: ColorFormat) => void,
}

export default function AdvancePicker({
                                          presetColors = [],
                                          favoriteColors = [],
                                          colorHistory = [],
                                          handleColorChange,
                                          addToFavorites,
                                          removeFromFavorites,
                                          currentHue,
                                          currentColor,
                                          setCurrentHue,
                                          theme,
                                          showFormats,
                                          currentFormat,
                                          currentColorString,
                                          handleFormatChange,
                                      }: AdvancePickerProps) {
    return (
        <div className='grid grid-cols-2 gap-10'>
            <div className='order-0'>
                <div className="mb-4">
                    <h4 className="text-sm dark:text-gray-200 font-medium mb-2 text-gray-600">Preset Colors</h4>
                    <div className="grid grid-cols-9 gap-2">
                        {presetColors.map((color, index) => (
                            <button
                                type='button'
                                key={index}
                                onClick={() => {
                                    const parsed = parseColor(color);
                                    if (parsed) handleColorChange(parsed);
                                }}
                                className="w-8 h-8 rounded-lg cursor-pointer border dark:border-gray-700 border-gray-200 hover:scale-110 transition-transform duration-200"
                                style={{backgroundColor: color}}
                                title={color}
                            />
                        ))}
                    </div>
                </div>

                {
                    favoriteColors.length > 0 && (
                        <div>
                            <h4 className="text-sm dark:text-gray-200 font-medium mb-2 text-gray-600 flex items-center gap-1">
                                Favorites
                            </h4>
                            <div className="flex flex-wrap gap-1">
                                {favoriteColors.map((color, index) => (
                                    <button
                                        type='button'
                                        key={index}
                                        onClick={() => handleColorChange(color)}
                                        onDoubleClick={() => removeFromFavorites(color)}
                                        className="w-6 h-6 rounded-sm border cursor-pointer dark:border-gray-700 border-gray-200 hover:scale-110 transition-transform duration-200"
                                        style={{backgroundColor: color.hex}}
                                        title={`${color.hex} (double-click to remove)`}
                                    />
                                ))}
                            </div>
                        </div>
                    )
                }

                {
                    colorHistory.length > 0 && (
                        <div>
                            <h4 className="text-sm font-medium my-3 text-gray-600 dark:text-gray-200 flex items-center gap-1">
                                Recent Colors
                            </h4>
                            <div className="flex flex-wrap gap-1">
                                {colorHistory.slice(0, 10).map((color, index) => (
                                    <button
                                        type='button'
                                        key={index}
                                        onClick={() => handleColorChange(color)}
                                        onDoubleClick={() => addToFavorites(color)}
                                        className="w-6 h-6 rounded-sm border dark:border-gray-700 border-gray-200 hover:scale-110 transition-transform cursor-pointer duration-200"
                                        style={{backgroundColor: color.hex}}
                                        title={`${color.hex} (double-click to favorite)`}
                                    />
                                ))}
                            </div>
                        </div>
                    )
                }

                {showFormats && (
                    <div className='mt-5'>
                        <FormatSelect currentFormat={currentFormat || 'hex'} handleFormatChange={handleFormatChange}
                                      theme={theme}/>
                    </div>
                )}

            </div>
            <div>
                <HueBox
                    color={currentColor}
                    onChange={handleColorChange}
                />

                <ColorSlider hue={currentHue} onChange={setCurrentHue}/>

                <BrightnessSlider
                    type="alpha"
                    value={currentColor.rgb.a || 1}
                    color={currentColor}
                    onChange={(alpha) => {
                        const newColor = colorToValue(
                            currentColor.rgb.r,
                            currentColor.rgb.g,
                            currentColor.rgb.b,
                            alpha
                        );
                        handleColorChange(newColor);
                    }}
                />

                <ColorInput
                    value={currentColorString || ''}
                    format={currentFormat || 'hex' as ColorFormat}
                    onChange={(colorString) => {
                        const parsed = parseColor(colorString);
                        if (parsed) handleColorChange(parsed);
                    }}
                    theme={theme}
                />
            </div>
        </div>
    );
};