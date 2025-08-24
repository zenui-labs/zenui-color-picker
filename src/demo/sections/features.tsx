import React from 'react';
import { Zap, Smartphone, Palette, Code2, Shield, Sparkles } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
    const features = [
        {
            icon: <Zap className="w-6 h-6" />,
            title: 'Lightning Fast',
            description: 'Optimized for performance with minimal bundle size and smooth interactions.'
        },
        {
            icon: <Smartphone className="w-6 h-6" />,
            title: 'Mobile Friendly',
            description: 'Responsive design that works perfectly on all devices and touch interfaces.'
        },
        {
            icon: <Palette className="w-6 h-6" />,
            title: 'Multiple Formats',
            description: 'Support for HEX, RGB, HSL, and CMYK color formats with easy conversion.'
        },
        {
            icon: <Code2 className="w-6 h-6" />,
            title: 'Framework Agnostic',
            description: 'Works seamlessly with React, Next.js, Vue.js, and vanilla JavaScript.'
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: 'TypeScript Ready',
            description: 'Full TypeScript support with comprehensive type definitions included.'
        },
        {
            icon: <Sparkles className="w-6 h-6" />,
            title: 'Highly Customizable',
            description: 'Extensive theming options and props to match your application design.'
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Powerful Features
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Everything you need to integrate beautiful color picking functionality into your applications.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-200 transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Ready to get started?
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                            Join thousands of developers who trust our color picker for their projects.
                            Get up and running in minutes with our comprehensive documentation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                                View Documentation
                            </button>
                            <button className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                                Browse Examples
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};