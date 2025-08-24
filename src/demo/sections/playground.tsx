import React, {useState} from 'react';
import {Code, Eye, Palette, Settings} from 'lucide-react';
import {ColorPicker} from "../../lib";

export const PlaygroundSection: React.FC = () => {
    const [selectedColor, setSelectedColor] = useState('#3B82F6');
    const [format, setFormat] = useState<'hex' | 'rgb' | 'hsl'>('hex');
    const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
    const [showPresets, setShowPresets] = useState(true);
    const [showCode, setShowCode] = useState(false);

    const generateCode = () => {
        return `<ColorPicker
  defaultColor="${selectedColor}"
  format="${format}"
  size="${size}"
  showPresets={${showPresets}}
  onChange={(color) => {
    console.log('Selected color:', color);
    // Your color handling logic here
  }}
/>`;
    };

    return (
        <section id='playground' className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Interactive Playground
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Experiment with different configurations and see how the color picker adapts to your needs.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Controls Panel */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center mb-4">
                                <Settings className="w-5 h-5 text-blue-600 mr-2"/>
                                <h3 className="text-lg font-semibold text-gray-900">Configuration</h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Color Format
                                    </label>
                                    <select
                                        value={format}
                                        onChange={(e) => setFormat(e.target.value as 'hex' | 'rgb' | 'hsl')}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="hex">HEX (#ffffff)</option>
                                        <option value="rgb">RGB (rgb(255, 255, 255))</option>
                                        <option value="hsl">HSL (hsl(0, 0%, 100%))</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Size
                                    </label>
                                    <select
                                        value={size}
                                        onChange={(e) => setSize(e.target.value as 'sm' | 'md' | 'lg')}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="sm">Small</option>
                                        <option value="md">Medium</option>
                                        <option value="lg">Large</option>
                                    </select>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="showPresets"
                                        checked={showPresets}
                                        onChange={(e) => setShowPresets(e.target.checked)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="showPresets" className="ml-2 text-sm font-medium text-gray-700">
                                        Show Color Presets
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center mb-4">
                                <Palette className="w-5 h-5 text-blue-600 mr-2"/>
                                <h3 className="text-lg font-semibold text-gray-900">Selected Color</h3>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div
                                    className="w-16 h-16 rounded-lg border-2 border-gray-200 shadow-inner"
                                    style={{backgroundColor: selectedColor}}
                                />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600">Current Color:</p>
                                    <p className="font-mono text-lg font-semibold text-gray-900">{selectedColor}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <Code className="w-5 h-5 text-blue-600 mr-2"/>
                                    <h3 className="text-lg font-semibold text-gray-900">Generated Code</h3>
                                </div>
                                <button
                                    onClick={() => setShowCode(!showCode)}
                                    className="flex items-center px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <Eye className="w-4 h-4 mr-1"/>
                                    {showCode ? 'Hide' : 'Show'}
                                </button>
                            </div>

                            {showCode && (
                                <pre className="p-4 bg-gray-900 text-gray-300 rounded-lg text-sm overflow-x-auto">
                  {generateCode()}
                </pre>
                            )}
                        </div>
                    </div>

                    {/* Live Preview */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Live Preview</h3>
                            <p className="text-sm text-gray-600 text-center">
                                Try different settings and see real-time changes
                            </p>
                        </div>
                        <ColorPicker/>
                    </div>
                </div>
            </div>
        </section>
    );
};