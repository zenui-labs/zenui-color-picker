import {ArrowRight, Check, Copy, Github} from "lucide-react"
import {useState} from "react"
import {ColorPicker} from "../../lib";

const Hero = () => {
    const [copied, setCopied] = useState(false)
    const [activeFramework, setActiveFramework] = useState("react")
    const [currentColor, setCurrentColor] = useState("#00AA45")
    const [prevColor, setPrevColor] = useState("#00AA45")

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const installCommands = {
        npm: {
            react: "npm install @zenui/color-picker-react",
            vue: "npm install @zenui/color-picker-vue",
        },
    }

    const currentCommand =
        installCommands['npm' as keyof typeof installCommands][activeFramework as keyof typeof installCommands.npm]

    const handleColorChange = (color: { hex: string }) => {
        setPrevColor(currentColor)
        setCurrentColor(color.hex)
    }

    return (
        <section id="home"
                 className="pt-24 flex max-w-[1200px] justify-between items-center gap-[100px] mx-auto pb-20 bg-gradient-to-br">
            <div className="space-y-8 max-w-[600px]">
                <div className="space-y-6">
                    <h1 className="text-[3.5rem] font-bold dark:text-darkText text-gray-900 leading-tight">
                        Beautiful Color Picker
                        <span
                            className="block text-transparent bg-clip-text transition-all duration-500"
                            style={{
                                backgroundImage: `linear-gradient(to right, ${prevColor}, ${currentColor})`,
                            }}
                        >
                            for Modern Apps
                        </span>
                    </h1>

                    <p className="text-xl dark:text-darkTextMuted text-gray-600 leading-relaxed">
                        A lightweight, customizable, and framework-agnostic color picker component that works
                        seamlessly with
                        React, Next.js and Vue.js applications.
                    </p>

                    <div className="flex flex-col sm:flex-row mt-10 gap-4">
                        <button
                            className="flex cursor-pointer items-center justify-center px-8 py-3 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                            Get Started
                            <ArrowRight className="w-5 h-5 ml-2"/>
                        </button>
                        <button
                            className="flex cursor-pointer items-center dark:border-darkBorder dark:hover:bg-gray-800 justify-center px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 dark:text-darkText transition-colors">
                            <Github className="w-5 h-5 mr-2"/>
                            View on GitHub
                        </button>
                    </div>
                </div>

                <div
                    className="bg-white border border-gray-200 dark:shadow-darkShadow shadow-lg dark:bg-darkBg dark:border-darkBorder rounded-xl overflow-hidden">
                    <div className="flex border-b border-gray-200 dark:border-darkBorder dark:bg-gray-900 bg-gray-100">
                        {["react", "vue"].map((framework) => (
                            <button
                                key={framework}
                                onClick={() => setActiveFramework(framework)}
                                className={`px-4 py-3 cursor-pointer text-sm border-b-2 border-transparent font-medium capitalize transition-colors ${
                                    activeFramework === framework
                                        ? "bg-white dark:bg-gray-800 text-accent !border-accent"
                                        : "text-gray-600 hover:text-gray-900 dark:hover:text-darkText dark:text-darkTextMuted"
                                }`}
                            >
                                {framework}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center justify-between text-green-600 p-4">
                        <code className="text-sm font-mono flex-1">
                            <span className="text-gray-500">$</span> {currentCommand}
                        </code>
                        <button
                            onClick={() => copyToClipboard(currentCommand)}
                            className="p-2 text-gray-400 transition-colors rounded-md dark:hover:bg-gray-800  hover:bg-gray-200"
                            title="Copy to clipboard"
                        >
                            {copied ? <Check className="w-4 h-4 text-green-400"/> :
                                <Copy className="w-4 h-4 cursor-pointer"/>}
                        </button>
                    </div>
                </div>
            </div>

            <ColorPicker
                onChange={handleColorChange}
                inline
                variant={'hue-box'}
                showHistory={false}
                enableHueSlider
                popupStyle={"border-gray-200 w-[420px]"}
            />
        </section>
    )
}

export default Hero
