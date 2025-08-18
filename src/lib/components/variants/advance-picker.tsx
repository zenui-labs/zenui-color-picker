import {HueBox} from "./hue-box.tsx";
import {parseColor} from "../../utils/colorUtils.ts";
import {Heart, History} from "lucide-react";
import {ColorValue} from "../../types.ts";
import {ColorInput} from "../ColorInput.tsx";
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
    currentFormat?: string,
    currentColorString?: string,
    handleFormatChange?: (format: string) => void,
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
            <div>
                <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2 text-gray-600">Preset Colors</h4>
                    <div className="grid grid-cols-7 gap-2">
                        {presetColors.map((color, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    const parsed = parseColor(color);
                                    if (parsed) handleColorChange(parsed);
                                }}
                                className="w-8 h-8 rounded-lg cursor-pointer border border-gray-200 hover:scale-110 transition-transform duration-200"
                                style={{backgroundColor: color}}
                                title={color}
                            />
                        ))}
                    </div>
                </div>

                {
                    favoriteColors.length > 0 && (
                        <div>
                            <h4 className="text-sm font-medium mb-2 text-gray-600 flex items-center gap-1">
                                <Heart size={14}/>
                                Favorites
                            </h4>
                            <div className="flex flex-wrap gap-1">
                                {favoriteColors.map((color, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleColorChange(color)}
                                        onDoubleClick={() => removeFromFavorites(color)}
                                        className="w-6 h-6 rounded-sm border border-gray-200 hover:scale-110 transition-transform duration-200"
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
                            <h4 className="text-sm font-medium mb-2 text-gray-600 flex items-center gap-1">
                                <History size={14}/>
                                Recent Colors
                            </h4>
                            <div className="flex flex-wrap gap-1">
                                {colorHistory.slice(0, 10).map((color, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleColorChange(color)}
                                        onDoubleClick={() => addToFavorites(color)}
                                        className="w-6 h-6 rounded-sm border border-gray-200 hover:scale-110 transition-transform duration-200"
                                        style={{backgroundColor: color.hex}}
                                        title={`${color.hex} (double-click to favorite)`}
                                    />
                                ))}
                            </div>
                        </div>
                    )
                }
            </div>
            <div>
                <HueBox
                    color={currentColor}
                    onChange={handleColorChange}
                />
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        {showFormats && (
                            <FormatSelect currentFormat={currentFormat} handleFormatChange={handleFormatChange}
                                          theme={theme}/>
                        )}
                    </div>

                    <ColorInput
                        value={currentColorString}
                        format={currentFormat}
                        onChange={(colorString) => {
                            const parsed = parseColor(colorString);
                            if (parsed) handleColorChange(parsed);
                        }}
                        theme={theme}
                    />
                </div>
            </div>
        </div>
    );
};