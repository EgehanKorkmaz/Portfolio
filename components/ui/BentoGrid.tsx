"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoCopyOutline } from "react-icons/io5";
import Lottie from "react-lottie";

import { cn } from "@/lib/utils";
import { techStack } from "@/data";
import { useLanguage } from "@/context/LanguageContext";

import { BackgroundGradientAnimation } from "./GradientBg";
import GridGlobe from "./GridGlobe";
import animationData from "@/data/confetti.json";
import MagicButton from "../MagicButton";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-3 sm:gap-5 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const { t } = useLanguage();
  const { leftLists, rightLists } = techStack;

  // Kesintisiz (seamless) dikey akış için listeleri ikiye katlıyoruz
  const marqueeLeft = [...leftLists, ...leftLists];
  const marqueeRight = [...rightLists, ...rightLists];
  const allTechMobile = [
    ...leftLists,
    ...rightLists,
    ...leftLists,
    ...rightLists,
  ];

  const [copied, setCopied] = useState(false);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCopy = () => {
    const text = "egehankrkmz@gmail.com";
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
        className
      )}
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <img
              src={img}
              alt={String(title)}
              className={cn(
                imgClassName,
                "object-cover object-center",
                id === 5 && "opacity-30 sm:opacity-100"
              )}
            />
          )}
        </div>
        <div
          className={`absolute right-0 -bottom-5 ${id === 5 && "w-full opacity-80"
            }`}
        >
          {spareImg && (
            <img
              src={spareImg}
              alt="decorative-grid"
              className="object-cover object-center w-full h-full"
            />
          )}
        </div>
        {id === 6 && (
          <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl"></div>
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col p-3.5 sm:p-5 lg:p-10"
          )}
        >
          {/* Açıklama Metni: id === 3 ise sağdaki kutulara çarpmaması için genişlik sınırı */}
          <div
            className={cn(
              "font-sans font-extralight text-[10px] sm:text-xs lg:text-sm text-[#C1C2D3] z-10",
              id === 3
                ? "max-w-[44%] sm:max-w-[42%] break-words leading-tight mb-1"
                : "md:max-w-32"
            )}
          >
            {description}
          </div>

          {/* Başlık Metni: id === 3 ise sağdaki kutuların üstüne binmemesi için genişlik sınırı */}
          <div
            className={cn(
              "font-sans font-bold z-10",
              id === 3
                ? "text-xs sm:text-lg lg:text-2xl max-w-[44%] sm:max-w-[42%] leading-tight break-words"
                : id === 5
                  ? "text-xs sm:text-lg lg:text-3xl max-w-full sm:max-w-96 leading-snug"
                  : "text-base sm:text-lg lg:text-3xl max-w-96"
            )}
          >
            {title}
          </div>

          {id === 2 && <GridGlobe />}

          {/* TECH STACK: Framer Motion ile %100 Garantili Dikey Akış */}
          {id === 3 && (
            <>
              {/* PC & Tablet (2 Sütunlu: Sol yukarı, Sağ aşağı akar) */}
              <div className="hidden sm:flex gap-2 lg:gap-3 w-fit absolute right-2 lg:right-4 inset-y-0 overflow-hidden items-start [mask-image:linear-gradient(to_bottom,transparent,white_12%,white_88%,transparent)]">
                {/* Sol Sütun (Yukarı doğru akar) */}
                <motion.div
                  className="flex flex-col gap-2.5 lg:gap-3 h-max py-1.5"
                  animate={{ y: ["0%", "-50%"] }}
                  transition={{
                    duration: 16,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  {marqueeLeft.map((item, i) => (
                    <span
                      key={`left-${i}`}
                      className="lg:py-3 lg:px-3 py-2 px-2.5 text-xs lg:text-sm opacity-90 rounded-lg text-center bg-[#10132E] border border-white/[0.08] whitespace-nowrap"
                    >
                      {item}
                    </span>
                  ))}
                </motion.div>

                {/* Sağ Sütun (Aşağı doğru akar) */}
                <motion.div
                  className="flex flex-col gap-2.5 lg:gap-3 h-max py-1.5"
                  animate={{ y: ["-50%", "0%"] }}
                  transition={{
                    duration: 18,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  {marqueeRight.map((item, i) => (
                    <span
                      key={`right-${i}`}
                      className="lg:py-3 lg:px-3 py-2 px-2.5 text-xs lg:text-sm opacity-90 rounded-lg text-center bg-[#10132E] border border-white/[0.08] whitespace-nowrap"
                    >
                      {item}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* Mobil (Tek Sütunlu: Yukarı doğru akar) */}
              <div className="flex sm:hidden w-fit absolute right-2 inset-y-0 overflow-hidden items-start [mask-image:linear-gradient(to_bottom,transparent,white_12%,white_88%,transparent)]">
                <motion.div
                  className="flex flex-col gap-2 h-max py-1"
                  animate={{ y: ["0%", "-50%"] }}
                  transition={{
                    duration: 20,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  {allTechMobile.map((item, i) => (
                    <span
                      key={`mob-${i}`}
                      className="py-1.5 px-2 text-[10px] font-medium opacity-90 rounded-md text-center bg-[#10132E] border border-white/[0.08] whitespace-nowrap"
                    >
                      {item}
                    </span>
                  ))}
                </motion.div>
              </div>
            </>
          )}

          {id === 6 && (
            <div className="mt-5 relative">
              {copied && (
                <div className="absolute -bottom-5 right-0 pointer-events-none">
                  <Lottie options={defaultOptions} height={200} width={400} />
                </div>
              )}

              <MagicButton
                title={copied ? t.bentoCopy.copied : t.bentoCopy.copy}
                icon={<IoCopyOutline />}
                position="left"
                handleClick={handleCopy}
                otherClasses="!bg-[#161A31]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};