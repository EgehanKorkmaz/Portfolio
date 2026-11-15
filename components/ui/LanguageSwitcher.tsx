"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/data";
import { cn } from "@/lib/utils";

const languages: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "tr", label: "TR" },
    { code: "de", label: "DE" },
];

export const LanguageSwitcher = () => {
    const { lang, setLang } = useLanguage();

    return (
        <div
            className="fixed top-4 right-4 sm:top-10 sm:right-10 z-[5000] flex items-center gap-1 p-1.5 rounded-xl border border-white/[0.125] shadow-lg"
            style={{
                backdropFilter: "blur(16px) saturate(180%)",
                backgroundColor: "rgba(17, 25, 40, 0.75)",
            }}
            role="group"
            aria-label="Language Switcher"
        >
            {languages.map((item) => {
                const isActive = lang === item.code;
                return (
                    <button
                        key={item.code}
                        onClick={() => setLang(item.code)}
                        className={cn(
                            "px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer",
                            isActive
                                ? "bg-purple text-[#190018] shadow-sm"
                                : "text-white-200 hover:text-white hover:bg-white/[0.06]"
                        )}
                    >
                        {item.label}
                    </button>
                );
            })}
        </div>
    );
};