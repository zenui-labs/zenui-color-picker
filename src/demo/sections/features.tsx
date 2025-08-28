import React from 'react';
import {Code2, Palette, Shield, Smartphone, Sparkles, Zap} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
    const features = [
        {
            icon: <Zap className="w-6 h-6"/>,
            title: 'Lightning Fast',
            description: 'Optimized for performance with minimal bundle size and smooth interactions.'
        },
        {
            icon: <Smartphone className="w-6 h-6"/>,
            title: 'Mobile Friendly',
            description: 'Responsive design that works perfectly on all devices and touch interfaces.'
        },
        {
            icon: <Palette className="w-6 h-6"/>,
            title: 'Multiple Formats',
            description: 'Support for HEX, RGB, HSL, and CMYK color formats with easy conversion.'
        },
        {
            icon: <Code2 className="w-6 h-6"/>,
            title: 'Framework Agnostic',
            description: 'Works seamlessly with React, Next.js, Vue.js'
        },
        {
            icon: <Shield className="w-6 h-6"/>,
            title: 'TypeScript Ready',
            description: 'Full TypeScript support with comprehensive type definitions included.'
        },
        {
            icon: <Sparkles className="w-6 h-6"/>,
            title: 'Highly Customizable',
            description: 'Extensive theming options and props to match your application design.'
        }
    ];

    return (
        <section id='features' className="py-20">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-[2.5rem] dark:text-darkText font-bold text-gray-900 mb-2">
                        Powerful Features
                    </h2>
                    <p className="text-lg dark:text-darkTextMuted text-gray-600 max-w-2xl mx-auto">
                        Everything you need to integrate beautiful color picking functionality into your applications.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-6 rounded-xl dark:border-darkBorder border border-gray-200 hover:border-accent/40 hover:shadow-lg dark:hover:shadow-darkShadow transition-all duration-300"
                        >
                            <div
                                className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-white duration-300 transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl dark:text-darkText font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-darkTextMuted/90 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-accent/10 text-center mt-16 rounded-2xl p-12">
                <h3 className="text-[2.3rem] font-bold dark:text-darkText text-gray-900 mb-2">
                    Ready to get started?
                </h3>
                <p className="text-gray-600 dark:text-darkTextMuted mb-12 text-base max-w-2xl mx-auto">
                    Join thousands of developers who trust our color picker for their projects.
                    Get up and running in minutes with our comprehensive documentation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        type='button'
                        className="px-8 cursor-pointer py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors">
                        View Documentation
                    </button>
                    <button
                        type='button'
                        className="px-8 cursor-pointer dark:border-darkBorder dark:text-darkText dark:hover:bg-gray-800 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                        Browse Examples
                    </button>
                </div>
            </div>

        </section>
    );
};