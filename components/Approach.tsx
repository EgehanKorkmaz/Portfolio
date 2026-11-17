"use client";

import React, { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { CanvasRevealEffect } from "./ui/CanvasRevealEffect";

const Approach = () => {
  const { t } = useLanguage();
  const phases = t.approachSection.phases;

  return (
    <section className="w-full py-20">
      <h2 className="heading">
        {t.approachSection.headingPart1}{" "}
        <span className="text-purple">
          {t.approachSection.headingHighlight}
        </span>
      </h2>
      <div className="my-12 lg:my-20 flex flex-col lg:flex-row items-center justify-center w-full gap-8 lg:gap-4">
        <Card
          title={phases[0].title}
          icon={<AceternityIcon order={phases[0].order} />}
          des={phases[0].des}
        >
          <CanvasRevealEffect
            animationSpeed={5.1}
            containerClassName="bg-emerald-900 rounded-3xl overflow-hidden"
          />
        </Card>
        <Card
          title={phases[1].title}
          icon={<AceternityIcon order={phases[1].order} />}
          des={phases[1].des}
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-pink-900 rounded-3xl overflow-hidden"
            colors={[
              [255, 166, 158],
              [221, 255, 247],
            ]}
            dotSize={2}
          />
        </Card>
        <Card
          title={phases[2].title}
          icon={<AceternityIcon order={phases[2].order} />}
          des={phases[2].des}
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-sky-600 rounded-3xl overflow-hidden"
            colors={[[125, 211, 252]]}
          />
        </Card>
      </div>
    </section>
  );
};

export default Approach;

const Card = ({
  title,
  icon,
  children,
  des,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  des: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Ekranın dikey olarak tam merkez bandına (-38% üstten, -38% alttan) girdiğinde tetiklenir.
  // Böylece mobilde aynı anda sadece ekranın ortasındaki Phase kartı açılır.
  const isInView = useInView(cardRef, {
    margin: "-38% 0px -38% 0px",
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isActive = isMobile ? isInView : hovered;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center
       dark:border-white/[0.2] max-w-sm w-full mx-auto p-4 relative h-[24rem] lg:h-[35rem] rounded-3xl transition-all duration-300"
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <Icon className="absolute h-10 w-10 -top-3 -left-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -bottom-3 -left-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -top-3 -right-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -bottom-3 -right-3 dark:text-white text-black opacity-30" />

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full absolute inset-0 rounded-3xl overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 px-6 lg:px-10">
        <div
          className={`text-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
          transition duration-300 min-w-40 mx-auto flex items-center justify-center ${isActive
              ? "opacity-0 -translate-y-4 pointer-events-none"
              : "opacity-100"
            }`}
        >
          {icon}
        </div>
        <h3
          className={`dark:text-white text-center text-2xl lg:text-3xl relative z-10 text-black mt-4 font-bold transition duration-300 ${isActive ? "opacity-100 text-white -translate-y-2" : "opacity-0"
            }`}
        >
          {title}
        </h3>
        <p
          className={`text-sm relative z-10 mt-4 text-center transition duration-300 ${isActive ? "opacity-100 text-white -translate-y-2" : "opacity-0"
            }`}
          style={{ color: "#E4ECFF" }}
        >
          {des}
        </p>
      </div>
    </div>
  );
};

const AceternityIcon = ({ order }: { order: string }) => {
  return (
    <div>
      <div className="relative inline-flex overflow-hidden rounded-full p-[1px]">
        <span
          className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]
         bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
        />
        <span
          className="inline-flex h-full w-full cursor-pointer items-center 
        justify-center rounded-full bg-slate-950 px-5 py-2 text-purple backdrop-blur-3xl font-bold text-2xl"
        >
          {order}
        </span>
      </div>
    </div>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};