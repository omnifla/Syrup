import { Button } from "@/components/ui/button.tsx";
import CenteredScrollZone from "@/components/ui/CenteredScrollZone.tsx";
import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon, SunMoon, SwatchBook } from "lucide-react";

export function ThemeSwitcher() {
    const { setTheme } = useTheme();

    const ToogleDropdown = () => {
        const wrapper = document.querySelector('.theme') as HTMLDivElement;
        wrapper.classList.toggle('hidden');
    }

    return (
        <div className="flex relative">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                    ToogleDropdown();
                }}>
                <SwatchBook className="h-[1.2rem] aspect-auto" />
            </Button>
            <CenteredScrollZone className="theme">
                <div className="w-[60%] h-[100%] flex flex-col border-1 border-white border-opacity-70 bg-card rounded-lg dropdown-content">
                    <div>
                        <Sun onClick={() => { setTheme("light"); ToogleDropdown(); }}/>
                    </div>
                    <div>
                        <Moon  onClick={() => { setTheme("dark"); ToogleDropdown(); }}/>
                    </div>
                    <div>
                        <SunMoon onClick={() => { setTheme("system"); ToogleDropdown(); }}/>
                    </div>
                </div>
            </CenteredScrollZone>
        </div>
    );
}

export default ThemeSwitcher;