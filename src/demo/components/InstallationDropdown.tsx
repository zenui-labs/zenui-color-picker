import React, { useState } from 'react';
import { ChevronDown, Copy, Check } from 'lucide-react';

interface InstallationDropdownProps {
    packageName?: string;
}

export const InstallationDropdown: React.FC<InstallationDropdownProps> = ({
                                                                              packageName = "awesome-color-picker"
                                                                          }) => {
    const [selectedFramework, setSelectedFramework] = useState<'react' | 'vue'>('react');
    const [copied, setCopied] = useState(false);

    const installations = {
        react: {
            npm: `npm install ${packageName}`,
            yarn: `yarn add ${packageName}`,
            pnpm: `pnpm add ${packageName}`,
            usage: `import { ColorPicker } from '${packageName}';

function MyComponent() {
  return (
    <ColorPicker 
      defaultColor="#3B82F6"
      onChange={(color) => console.log(color)}
      format="hex"
    />
  );
}`
        },
        vue: {
            npm: `npm install ${packageName}`,
            yarn: `yarn add ${packageName}`,
            pnpm: `pnpm add ${packageName}`,
            usage: `<template>
  <ColorPicker 
    :defaultColor="'#3B82F6'"
    @change="handleColorChange"
    format="hex"
  />
</template>

<script>
import { ColorPicker } from '${packageName}';

export default {
  components: { ColorPicker },
  methods: {
    handleColorChange(color) {
      console.log(color);
    }
  }
}
</script>`
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Installation</h3>

            <div className="relative">
                <select
                    value={selectedFramework}
                    onChange={(e) => setSelectedFramework(e.target.value as 'react' | 'vue')}
                    className="w-full p-3 pr-10 bg-gray-50 border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="react">React / Next.js</option>
                    <option value="vue">Vue.js</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>

            <div className="space-y-3">
                <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Install with npm:</p>
                    <div className="relative">
                        <code className="block p-3 bg-gray-900 text-green-400 rounded-lg text-sm font-mono">
                            {installations[selectedFramework].npm}
                        </code>
                        <button
                            onClick={() => copyToClipboard(installations[selectedFramework].npm)}
                            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-white transition-colors"
                        >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Basic usage:</p>
                    <div className="relative">
            <pre className="p-3 bg-gray-900 text-gray-300 rounded-lg text-xs overflow-x-auto">
              {installations[selectedFramework].usage}
            </pre>
                        <button
                            onClick={() => copyToClipboard(installations[selectedFramework].usage)}
                            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-white transition-colors"
                        >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex space-x-2 text-xs text-gray-500">
                <span>Also available:</span>
                <code className="px-2 py-1 bg-gray-100 rounded">yarn add {packageName}</code>
                <code className="px-2 py-1 bg-gray-100 rounded">pnpm add {packageName}</code>
            </div>
        </div>
    );
};