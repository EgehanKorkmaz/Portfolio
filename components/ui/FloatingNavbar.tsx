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

export const FloatingNav = ({ className }: { className?: string }) => {
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          // Sabit yükseklik h-11 (mobil) ve sm:h-14 (PC) ile dil kutusuyla milimetrik aynı boyutta
          "flex h-11 sm:h-14 max-w-fit fixed z-[5000] top-4 sm:top-10 inset-x-0 mx-auto px-5 sm:px-9 rounded-xl border border-white/[0.125] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center space-x-5 sm:space-x-7",
          className
        )}
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(17, 25, 40, 0.75)",
        }}
      >
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
      </motion.nav>
    </AnimatePresence>
  );
};