"use client"

import {ArrowRight, Check, Copy, Github} from "lucide-react"
import {useState} from "react"
import {ColorPicker} from "../../lib";

const Hero = () => {
    const [copied, setCopied] = useState(false)
    const [activeTab, setActiveTab] = useState("npm")
    const [activeFramework, setActiveFramework] = useState("react")
    const [currentColor, setCurrentColor] = useState("#3B82F6")

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const installCommands = {
        npm: {
            react: "npm install @zenui/color-picker-react",
            vue: "npm install @zenui/color-picker-vue",
            svelte: "npm install @zenui/color-picker-svelte",
        },
        yarn: {
            react: "yarn add @zenui/color-picker-react",
            vue: "yarn add @zenui/color-picker-vue",
            svelte: "yarn add @zenui/color-picker-svelte",
        },
        pnpm: {
            react: "pnpm add @zenui/color-picker-react",
            vue: "pnpm add @zenui/color-picker-vue",
            svelte: "pnpm add @zenui/color-picker-svelte",
        },
    }

    const currentCommand =
        installCommands[activeTab as keyof typeof installCommands][activeFramework as keyof typeof installCommands.npm]

    return (
        <section id="home" className="pt-24 pb-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Content & Installation */}
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                                Beautiful Color Picker
                                <span
                                    className="block text-transparent bg-clip-text"
                                    style={{
                                        backgroundImage: `linear-gradient(to right, ${currentColor}80, ${currentColor})`,
                                    }}
                                >
  for Modern Apps
</span>

                            </h1>

                            <p className="text-xl text-gray-600 leading-relaxed">
                                A lightweight, customizable, and framework-agnostic color picker component that works
                                seamlessly with
                                React, Next.js, Vue.js, and Svelte applications.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    className="flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                                    Get Started
                                    <ArrowRight className="w-5 h-5 ml-2"/>
                                </button>
                                <button
                                    className="flex items-center justify-center px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                                    <Github className="w-5 h-5 mr-2"/>
                                    View on GitHub
                                </button>
                            </div>
                        </div>

                        {/* Enhanced Installation Section */}
                        <div className="bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden">
                            {/* Framework Tabs */}
                            <div className="flex border-b border-gray-200 bg-gray-50">
                                {["react", "vue", "svelte"].map((framework) => (
                                    <button
                                        key={framework}
                                        onClick={() => setActiveFramework(framework)}
                                        className={`px-4 py-3 text-sm font-medium capitalize transition-colors ${
                                            activeFramework === framework
                                                ? "bg-white text-blue-600 border-b-2 border-blue-600"
                                                : "text-gray-600 hover:text-gray-900"
                                        }`}
                                    >
                                        {framework}
                                    </button>
                                ))}
                            </div>

                            {/* Command Display */}
                            <div className="relative bg-gray-900 text-green-400">
                                <div className="flex items-center justify-between p-4">
                                    <code className="text-sm font-mono flex-1">
                                        <span className="text-gray-500">$</span> {currentCommand}
                                    </code>
                                    <button
                                        onClick={() => copyToClipboard(currentCommand)}
                                        className="p-2 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-gray-800"
                                        title="Copy to clipboard"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-green-400"/> :
                                            <Copy className="w-4 h-4"/>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Interactive Demo */}
                    <div className="flex flex-col items-center space-y-6">
                        <div className="relative">
                            <div
                                className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-20"></div>
                            <ColorPicker onChange={(color) => setCurrentColor(color.hex)} inline variant={'hue-box'}
                                         showHistory={false} enableHueSlider
                                         popupStyle={"border-gray-200 w-[420px]"}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
