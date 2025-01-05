import { Github } from "lucide-react"

const Header: React.FC<{}> = () => {
    return (
        <footer className="p-4 flex justify-between items-center border-t-2 border-border">
            <p className="text-center text-[.8rem]">Thanks to all contributors!</p>
            <a href="https://github.joinsyrup.com/" target="_blank" className="h-5 w-5">
                <Github />
            </a>
        </footer>
    );
}

export default Header;