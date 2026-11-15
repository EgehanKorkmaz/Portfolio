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
    // Her zaman varsayılan olarak İngilizce ("en") başlar
    const [lang, setLangState] = useState<Language>("en");

    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    const setLang = (newLang: Language) => {
        setLangState(newLang);
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