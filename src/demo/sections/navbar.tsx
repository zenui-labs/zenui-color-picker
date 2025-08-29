import {Github, Moon, Sun} from "lucide-react";
import {useEffect, useState} from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Logo from "../../assets/logo.png"

const Navbar = () => {
    const [theme, setTheme] = useState<string>(
        localStorage.getItem("zcp-theme") || "dark"
    );

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("zcp-theme", theme);
    }, [theme]);

    function toggleTheme() {
        setTheme(theme === "light" ? "dark" : "light");
    }

    return (
        <header
            className="fixed top-0 left-0  dark:border-darkBorder right-0 py-0.5 backdrop-blur-lg border-b border-gray-200 z-50">
            <div className="max-w-[1200px] mx-auto">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-1">
                        <img src={Logo} alt="color picker logo" className="w-[3.2rem]"/>
                        <h1 className="text-xl font-bold dark:text-darkText text-gray-900">ColorPicker</h1>
                    </div>

                    <div className='flex items-center gap-8'>
                        <a href="#home"
                           className="text-gray-800 dark:text-darkText hover:text-accent transition-colors duration-300">Home</a>
                        <a href="#features"
                           className="text-gray-800 dark:text-darkText hover:text-accent transition-colors duration-300">Features</a>
                        <a href="#playground"
                           className="text-gray-800 dark:text-darkText hover:text-accent transition-colors duration-300">Playground</a>
                    </div>

                    <div className="hidden md:flex text-gray-600 dark:text-darkText items-center gap-5">
                        <a
                            className='hover:text-accent transition-all duration-300'
                            href='https://github.com/zenui-labs/zenui-color-picker'
                            target='_blank'
                        >
                            <Github className="size-5.5"/>
                        </a>
                        {
                            theme === 'dark' ?
                                <Sun
                                    className="size-[23px] cursor-pointer hover:text-accent transition-all duration-300"
                                    onClick={toggleTheme}/> :
                                <Moon
                                    className="size-[23px] cursor-pointer hover:text-accent transition-all duration-300"
                                    onClick={toggleTheme}/>
                        }
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;