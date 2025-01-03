import { Button } from "@/components/ui/button";
import Footer from "./Footer";
import { X } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

const Settings: React.FC<{}> = () => {

    return (
        <div className="settings w-[100%] h-[100%] grid grid-cols-1 grid-rows-[10%,80%,10%] fixed top-0 left-0 hidden bg-background">
            <header className="flex flex-rows justify-between w-full p-4">
                <h1 className="text-2xl font-bold">Settings</h1>
                <Button variant="ghost" size="icon" onClick={() => {
                        const settings = document.querySelector('.settings') as HTMLDivElement;
                        settings.classList.toggle('hidden');}}><X />
                </Button>
            </header>
            <div className="center ">
                <label htmlFor="theme-select" className="block text-sm font-medium">Theme</label>
                <ThemeToggle />
                <LanguageSwitcher />
            </div>
            <Footer />
        </div>
    );
}

export default Settings;