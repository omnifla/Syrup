import { Button } from "@/components/ui/button.tsx";
import i18n, { languageNames, languages } from "@/i18n.ts";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import '@/components/languageswitcher.css';


export function LanguageSwitcher() {
    const { t } = useTranslation();
    const [language, setLanguage] = useState(i18n.language);

    const languagePath = (lang: string) => {
        return `/icons/${lang}.svg`;
    }

    return (
        <div className='dropdown'>
            <div className="flex">
                <Button
                    variant="ghost"
                    size="icon"
                >
                    <img src={languagePath(language)} alt={language} className="h-[1.2rem] aspect-auto" />
                </Button>
                <div className="hidden flex-col absolute wrapper">
                    <div className="">
                        <div className="flex flex-col pr-4 pl-3 py-1 mt-5 border-1 border-white border-opacity-70 bg-accent rounded-lg dropdown-content">
                            {
                                languages.map((lang) => (
                                    <div className="flex flex-row items-center" onClick={() => {
                                        i18n.changeLanguage(lang);
                                        setLanguage(lang);
                                    }}>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                        >
                                            <img src={languagePath(lang)} alt={lang} className="h-[1.2rem] w-[1.2rem] aspect-auto" />
                                        </Button>
                                        <p className="text-white text-sm ml-2 hover:cursor-pointer">{t(languageNames[languages.indexOf(lang)])}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}