import { useState } from 'react';
import { Github, Star, Download, ArrowRight } from 'lucide-react';
import { InstallationDropdown } from './components/InstallationDropdown';
import {FeaturesSection} from "./sections/features.tsx";
import {PlaygroundSection} from "./sections/playground.tsx";
import {ColorPicker} from "../lib";

function App() {
    const [heroColor, setHeroColor] = useState('#3B82F6');

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-3"></div>
                            <h1 className="text-xl font-bold text-gray-900">ColorPicker</h1>
                        </div>
                        <nav className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
                            <a href="#playground" className="text-gray-600 hover:text-gray-900 transition-colors">Playground</a>
                            <a href="#docs" className="text-gray-600 hover:text-gray-900 transition-colors">Docs</a>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <Star className="w-4 h-4" />
                                    <span>2.3k</span>
                                </div>
                                <a
                                    href="https://github.com"
                                    className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    <Github className="w-4 h-4" />
                                    <span>GitHub</span>
                                </a>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-24 pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Side - Content & Installation */}
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <div className="flex items-center space-x-2 text-blue-600">
                                    <div className="flex items-center space-x-2">
                                        <Download className="w-4 h-4" />
                                        <span className="text-sm font-medium">100k+ downloads</span>
                                    </div>
                                    <span>•</span>
                                    <span className="text-sm font-medium">v2.1.0</span>
                                </div>

                                <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                                    Beautiful Color Picker
                                    <span className="block text-blue-600">for Modern Apps</span>
                                </h1>

                                <p className="text-xl text-gray-600 leading-relaxed">
                                    A lightweight, customizable, and framework-agnostic color picker component
                                    that works seamlessly with React, Next.js, and Vue.js applications.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button className="flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                                        Get Started
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </button>
                                    <button className="flex items-center justify-center px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                                        <Github className="w-5 h-5 mr-2" />
                                        View on GitHub
                                    </button>
                                </div>
                            </div>

                            <InstallationDropdown packageName="awesome-color-picker" />
                        </div>

                        {/* Right Side - Interactive Demo */}
                        <div className="flex flex-col items-center space-y-6">
                            <div className="text-center">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Try it Live</h3>
                                <p className="text-gray-600">Pick a color and see the magic happen</p>
                            </div>

                            <ColorPicker/>

                            <div className="text-center space-y-2">
                                <p className="text-sm text-gray-600">Selected Color:</p>
                                <div className="flex items-center justify-center space-x-3">
                                    <div
                                        className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
                                        style={{ backgroundColor: heroColor }}
                                    />
                                    <code className="px-3 py-1 bg-gray-100 rounded-lg font-mono text-sm">
                                        {heroColor}
                                    </code>
                                </div>
                            </div>

                            {/* Demo Cards */}
                            <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
                                <div className="text-center p-4 bg-white rounded-lg shadow-sm border">
                                    <div className="w-12 h-12 mx-auto mb-2 rounded-lg" style={{ backgroundColor: heroColor }}></div>
                                    <p className="text-xs text-gray-600">Button</p>
                                </div>
                                <div className="text-center p-4 bg-white rounded-lg shadow-sm border">
                                    <div className="w-12 h-4 mx-auto mb-4 rounded" style={{ backgroundColor: heroColor }}></div>
                                    <p className="text-xs text-gray-600">Progress</p>
                                </div>
                                <div className="text-center p-4 bg-white rounded-lg shadow-sm border">
                                    <div className="w-12 h-12 mx-auto mb-2 rounded-full border-4" style={{ borderColor: heroColor }}></div>
                                    <p className="text-xs text-gray-600">Border</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <FeaturesSection />

            {/* Playground Section */}
            <div id="playground">
                <PlaygroundSection />
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mr-3"></div>
                                <h3 className="text-xl font-bold">ColorPicker</h3>
                            </div>
                            <p className="text-gray-400">
                                The most beautiful and customizable color picker for modern web applications.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Documentation</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Getting Started</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Examples</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Migration Guide</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Community</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Issues</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Feature Requests</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contributing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 ColorPicker. Made with ❤️ for developers worldwide.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;