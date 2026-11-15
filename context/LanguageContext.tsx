"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations } from "@/data";

type TranslationType = typeof translations.en;

interface LanguageContextProps {
    lang: Language;
    setLang: (lang: Language) => void;
    t: TranslationType;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
    undefined
);

export const LanguageProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [lang, setLangState] = useState<Language>("en");

    useEffect(() => {
        const savedLang = localStorage.getItem("portfolio_lang") as Language | null;
        if (savedLang && ["en", "tr", "de"].includes(savedLang)) {
            setLangState(savedLang);
            document.documentElement.lang = savedLang;
        } else {
            document.documentElement.lang = "en";
        }
    }, []);

    const setLang = (newLang: Language) => {
        setLangState(newLang);
        localStorage.setItem("portfolio_lang", newLang);
        document.documentElement.lang = newLang;
    };

    return (
        <LanguageContext.Provider
            value={{ lang, setLang, t: translations[lang] }}
        >
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};