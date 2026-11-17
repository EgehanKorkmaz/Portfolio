"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/data";

const languages: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "tr", label: "TR" },
  { code: "de", label: "DE" },
];

export const FloatingNav = ({ className }: { className?: string }) => {
  const { t, lang, setLang } = useLanguage();
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-[95vw] sm:max-w-fit fixed z-[5000] top-4 sm:top-10 inset-x-0 mx-auto px-4 sm:px-8 py-3 sm:py-4 rounded-2xl border border-white/[0.125] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center gap-3 sm:gap-6",
          className
        )}
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(17, 25, 40, 0.75)",
        }}
      >
        {/* Navigasyon Linkleri */}
        <div className="flex items-center gap-3 sm:gap-6">
          {t.navItems.map((navItem, idx: number) => (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className="relative dark:text-neutral-50 items-center flex text-neutral-600 dark:hover:text-purple transition-colors"
            >
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap !cursor-pointer">
                {navItem.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Dikey Ayraç */}
        <div className="h-4 w-[1px] bg-white/[0.2]" />

        {/* Entegre Dil Seçici (EN / TR / DE) */}
        <div className="flex items-center gap-1" role="group" aria-label="Language Switcher">
          {languages.map((item) => {
            const isActive = lang === item.code;
            return (
              <button
                key={item.code}
                onClick={() => setLang(item.code)}
                className={cn(
                  "px-2 py-1 rounded-lg text-[11px] sm:text-xs font-bold transition-all duration-200 cursor-pointer",
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
      </motion.nav>
    </AnimatePresence>
  );
};