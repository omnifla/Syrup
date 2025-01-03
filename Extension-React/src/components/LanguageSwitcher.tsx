import { Button } from "@/components/ui/button.tsx";
import i18n, { languageNames, languages, switchLanguage } from "@/i18n.ts";
import { useState } from "react";
import CenteredScrollZone from "@/components/ui/CenteredScrollZone.tsx";

export function LanguageSwitcher() {
    const [language, setLanguage] = useState(i18n.language);

    const languagePath = (lang: string) => {
        return `/icons/${lang}.svg`;
    }

    const ToogleDropdown = () => {
        const wrapper = document.querySelector('.drop') as HTMLDivElement;
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
                <img src={languagePath(language)} alt={language} className="h-[1.2rem] aspect-auto" />
            </Button>
            <CenteredScrollZone>
                <div className="w-[60%] h-[100%] flex flex-col border-1 border-white border-opacity-70 bg-card rounded-lg dropdown-content">
                    {
                        languages.map((lang) => (
                            <div className="flex flex-row justify-start" onClick={() => {
                                switchLanguage(lang);
                                setLanguage(lang);
                                ToogleDropdown();}}>
                                <Button className="w-[100%] bg-card text-card-foreground flex flex-row hover:text-primary hover:cursor-pointer hover:bg-primary/10">
                                    <img src={languagePath(lang)} alt={lang} className="h-[1.2rem] w-[1.2rem] aspect-auto" />
                                    <p className="text-card-foreground text-sm ml-2 hover:cursor-pointer">{languageNames[lang]}</p>
                                </Button>
                            </div>
                        ))
                    }
                </div>
            </CenteredScrollZone>
        </div>
    );
}