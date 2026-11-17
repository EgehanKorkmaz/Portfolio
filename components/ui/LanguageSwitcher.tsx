"use client";

import React, { useState, useRef, useEffect } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";
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
    const { scrollYProgress } = useScroll();
    const [visible, setVisible] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        if (typeof current === "number") {
            let direction = current! - scrollYProgress.getPrevious()!;
            if (scrollYProgress.get() < 0.05) {
                setVisible(true);
            } else {
                const isScrollingUp = direction < 0;
                setVisible(isScrollingUp);
                if (!isScrollingUp) setMobileOpen(false);
            }
        }
    });

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setMobileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const otherLanguages = languages.filter((item) => item.code !== lang);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                ref={dropdownRef}
                initial={{ opacity: 1, y: -100 }}
                animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="fixed top-4 right-4 sm:top-10 sm:right-10 z-[5000]"
            >
                {/* PC GÖRÜNÜMÜ: FloatingNav ile birebir aynı h-14 yükseklik ve stil */}
                <div
                    className="hidden sm:flex h-14 items-center gap-1.5 px-3.5 rounded-xl border border-white/[0.125] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                    style={{
                        backdropFilter: "blur(16px) saturate(180%)",
                        backgroundColor: "rgba(17, 25, 40, 0.75)",
                    }}
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
                                        : "text-neutral-50 hover:text-purple"
                                )}
                            >
                                {item.label}
                            </button>
                        );
                    })}
                </div>

                {/* MOBİL GÖRÜNÜMÜ: FloatingNav ile birebir aynı h-11 yükseklik */}
                <div className="sm:hidden relative flex flex-col items-end">
                    <button
                        onClick={() => setMobileOpen((prev) => !prev)}
                        className="flex h-11 min-w-[2.75rem] px-3 items-center justify-center rounded-xl border border-white/[0.125] text-xs font-bold text-purple shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] cursor-pointer"
                        style={{
                            backdropFilter: "blur(16px) saturate(180%)",
                            backgroundColor: "rgba(17, 25, 40, 0.75)",
                        }}
                        aria-label="Select Language"
                    >
                        {lang.toUpperCase()}
                    </button>

                    <AnimatePresence>
                        {mobileOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -8, scale: 0.92 }}
                                animate={{ opacity: 1, y: 6, scale: 1 }}
                                exit={{ opacity: 0, y: -8, scale: 0.92 }}
                                transition={{ duration: 0.18, ease: "easeOut" }}
                                className="flex flex-col gap-1 p-1 min-w-[2.75rem] rounded-xl border border-white/[0.125] shadow-xl"
                                style={{
                                    backdropFilter: "blur(16px) saturate(180%)",
                                    backgroundColor: "rgba(17, 25, 40, 0.92)",
                                }}
                            >
                                {otherLanguages.map((item) => (
                                    <button
                                        key={item.code}
                                        onClick={() => {
                                            setLang(item.code);
                                            setMobileOpen(false);
                                        }}
                                        className="h-9 px-2.5 rounded-lg text-xs font-bold text-neutral-50 hover:bg-purple hover:text-[#190018] transition-colors flex items-center justify-center"
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};