import {Github, Sun} from "lucide-react";

const Navbar = () => {
    return (
        <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div
                            className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-3"></div>
                        <h1 className="text-xl font-bold text-gray-900">ColorPicker</h1>
                    </div>

                    <div className='flex items-center gap-8'>
                        <a href="#home"
                           className="text-gray-600 hover:text-gray-900 transition-colors">Home</a>
                        <a href="#features"
                           className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
                        <a href="#playground"
                           className="text-gray-600 hover:text-gray-900 transition-colors">Playground</a>
                    </div>

                    <div className="hidden md:flex items-center gap-5">
                        <a>
                            <Github className="size-5.5"/>
                        </a>
                        <Sun className='size-6'/>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;