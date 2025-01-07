import { Github } from "lucide-react";

const Header: React.FC<{}> = () => {
    return (
        <footer className="p-4 flex justify-between items-center border-t-2 border-border">
            <a
                href="https://joinsyrup.com/about#contributors"
                className="text-center text-[.8rem] hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                target="_blank"
            >
                Thanks to all contributors!
            </a>
            <a
                href="https://github.joinsyrup.com/"
                target="_blank"
                className="h-5 w-5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
                <Github />
            </a>
        </footer>
    );
};

export default Header;
