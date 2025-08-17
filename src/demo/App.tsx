import {useState} from 'react';
import type {ColorFormat, ColorValue} from '../lib';
import {ColorPicker} from '../lib';

function App() {
    const [selectedColor, setSelectedColor] = useState('#3B82F6');
    const [colorFormat, setColorFormat] = useState<ColorFormat>('hex');

    const handleColorChange = (color: ColorValue, format: ColorFormat) => {
        console.log('Color changed:', {color, format});
        setSelectedColor(color.hex);
    };

    const handleFormatChange = (format: ColorFormat) => {
        setColorFormat(format);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        @devtools/color-picker
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        A comprehensive, developer-friendly color picker component with multiple variants and color
                        format support
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                        <span className="bg-white px-3 py-1 rounded-full">TypeScript</span>
                        <span className="bg-white px-3 py-1 rounded-full">React</span>
                        <span className="bg-white px-3 py-1 rounded-full">Tailwind CSS</span>
                        <span className="bg-white px-3 py-1 rounded-full">Multiple Formats</span>
                    </div>
                </div>

                {/* Demo Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {/* Advanced Variant */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Advanced Color Picker</h3>
                        <p className="text-gray-600 mb-6">
                            Full-featured color picker with color wheel, history, and favorites
                        </p>
                        <div className="flex items-center gap-4">
                            <ColorPicker
                                value={selectedColor}
                                format={colorFormat}
                                brandColor={'#bcb30a'}
                                variant="advanced"
                                showHistory={false}
                                showFormats={false}
                                enableFavorite={false}
                                onChange={handleColorChange}
                                onFormatChange={handleFormatChange}
                            />
                            <div className="flex-1">
                                <div className="text-sm text-gray-500 mb-1">Current Color</div>
                                <div className="font-mono text-sm bg-gray-50 p-2 rounded-sm">
                                    {selectedColor}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Basic Variant */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Basic Color Picker</h3>
                        <p className="text-gray-600 mb-6">
                            Simple color picker with essential features
                        </p>
                        <div className="flex items-center gap-4">
                            <ColorPicker
                                value="#FF6B6B"
                                variant="basic"
                                showAlpha={false}
                                showHistory={false}
                                onChange={(color) => console.log('Basic picker:', color)}
                            />
                            <div className="flex-1">
                                <div className="text-sm text-gray-500 mb-1">Format</div>
                                <div className="font-mono text-sm bg-gray-50 p-2 rounded-sm">
                                    HEX
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Compact Variant */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Compact Color Picker</h3>
                        <p className="text-gray-600 mb-6">
                            Space-efficient design for tight layouts
                        </p>
                        <div className="flex items-center gap-4">
                            <ColorPicker
                                value="#4ECDC4"
                                variant="compact"
                                showAlpha={true}
                                showFormats={true}
                                onChange={(color) => console.log('Compact picker:', color)}
                            />
                            <div className="flex-1">
                                <div className="text-sm text-gray-500 mb-1">Variant</div>
                                <div className="font-mono text-sm bg-gray-50 p-2 rounded-sm">
                                    Compact
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Different Formats */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">RGB Format</h3>
                        <p className="text-gray-600 mb-6">
                            Color picker with RGB format support
                        </p>
                        <div className="flex items-center gap-4">
                            <ColorPicker
                                value="rgb(139, 92, 246)"
                                format="rgb"
                                variant="advanced"
                                onChange={(color) => console.log('RGB picker:', color)}
                            />
                            <div className="flex-1">
                                <div className="text-sm text-gray-500 mb-1">Format</div>
                                <div className="font-mono text-sm bg-gray-50 p-2 rounded-sm">
                                    RGB
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">HSL Format</h3>
                        <p className="text-gray-600 mb-6">
                            Color picker with HSL format support
                        </p>
                        <div className="flex items-center gap-4">
                            <ColorPicker
                                value="hsl(45, 93%, 73%)"
                                format="hsl"
                                variant="advanced"
                                onChange={(color) => console.log('HSL picker:', color)}
                            />
                            <div className="flex-1">
                                <div className="text-sm text-gray-500 mb-1">Format</div>
                                <div className="font-mono text-sm bg-gray-50 p-2 rounded-sm">
                                    HSL
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dark Theme */}
                    <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-white">Dark Theme</h3>
                        <p className="text-gray-300 mb-6">
                            Color picker with dark theme support
                        </p>
                        <div className="flex items-center gap-4">
                            <ColorPicker
                                value="#F97316"
                                theme="dark"
                                variant="advanced"
                                onChange={(color) => console.log('Dark theme picker:', color)}
                            />
                            <div className="flex-1">
                                <div className="text-sm text-gray-400 mb-1">Theme</div>
                                <div className="font-mono text-sm bg-gray-700 text-white p-2 rounded-sm">
                                    Dark
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8">Package Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: 'Multiple Formats',
                                description: 'Support for HEX, RGB, HSL, HSV, and CMYK color formats',
                                icon: '🎨'
                            },
                            {
                                title: 'TypeScript Support',
                                description: 'Full TypeScript definitions with strict type checking',
                                icon: '📝'
                            },
                            {
                                title: 'Customizable Themes',
                                description: 'Light, dark, and custom theme support',
                                icon: '🎭'
                            },
                            {
                                title: 'Color History',
                                description: 'Automatic color history tracking with favorites',
                                icon: '📚'
                            },
                            {
                                title: 'Copy to Clipboard',
                                description: 'One-click color copying in any format',
                                icon: '📋'
                            },
                            {
                                title: 'Accessibility',
                                description: 'WCAG compliant with keyboard navigation',
                                icon: '♿'
                            },
                            {
                                title: 'Multiple Variants',
                                description: 'Basic, Advanced, Compact, and Palette variants',
                                icon: '🔧'
                            },
                            {
                                title: 'Developer Friendly',
                                description: 'Clean API with extensive customization options',
                                icon: '👨‍💻'
                            },
                            {
                                title: 'Lightweight',
                                description: 'Optimized bundle size with tree shaking support',
                                icon: '⚡'
                            }
                        ].map((feature, index) => (
                            <div key={index}
                                 className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="text-3xl mb-3">{feature.icon}</div>
                                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Installation & Usage */}
                <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">Installation & Usage</h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Installation</h3>
                            <pre className="bg-gray-100 rounded-lg p-4 overflow-x-auto">
                <code>{`npm install @devtools/color-picker`}</code>
              </pre>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-3">Basic Usage</h3>
                            <pre className="bg-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
                <code>{`import { ColorPicker } from '@devtools/color-picker';

function MyComponent() {
  const [color, setColor] = useState('#3B82F6');
  
  return (
    <ColorPicker
      value={color}
      format="hex"
      variant="advanced"
      onChange={(colorValue) => setColor(colorValue.hex)}
    />
  );
}`}</code>
              </pre>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-3">Advanced Usage</h3>
                            <pre className="bg-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
                <code>{`<ColorPicker
  value={color}
  format="hsl"
  variant="advanced"
  theme="dark"
  showAlpha={true}
  showHistory={true}
  showEyeDropper={true}
  presetColors={['#FF6B6B', '#4ECDC4', '#45B7D1']}
  onChange={(colorValue, format) => {
    console.log('Color:', colorValue);
    console.log('Format:', format);
  }}
/>`}</code>
              </pre>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-16 text-center text-gray-500">
                    <p>Built with React, TypeScript, and Tailwind CSS</p>
                    <p className="mt-2">Perfect for developers who need a powerful, customizable color picker</p>
                </div>
            </div>
        </div>
    );
}

export default App;