/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState, useEffect } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { useLanguage } from "@/context/LanguageContext";
import { PinContainer } from "./ui/Pin";

const RecentProjects = () => {
  const { t } = useLanguage();
  const marqueeProjects = [...t.projects, ...t.projects];

  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef<number>(0);
  const startXRef = useRef<number>(0);
  const startPosRef = useRef<number>(0);
  const initializedRef = useRef<boolean>(false);

  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);

  // Otomatik kayma hızı (Soldan sağa akış için pozitif: 0.8, sağdan sola için negatif: -0.8)
  const SPEED = 0.8;

  const wrapPosition = (pos: number, halfWidth: number) => {
    if (halfWidth <= 0) return pos;
    let wrapped = pos % halfWidth;
    if (wrapped > 0) wrapped -= halfWidth;
    return wrapped;
  };

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      const track = trackRef.current;
      if (track) {
        const halfWidth = track.scrollWidth / 2;

        if (!initializedRef.current && halfWidth > 0) {
          posRef.current = -halfWidth / 2;
          initializedRef.current = true;
        }

        if (!isHovered && !isDragging && halfWidth > 0) {
          posRef.current = wrapPosition(posRef.current + SPEED, halfWidth);
          track.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, isDragging, SPEED]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Sadece sol tık veya dokunmatik ekranda çalışsın
    if (e.pointerType === "mouse" && e.button !== 0) return;
    setIsDragging(true);
    setHasDragged(false);
    startXRef.current = e.clientX;
    startPosRef.current = posRef.current;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !trackRef.current) return;
    const dx = e.clientX - startXRef.current;

    if (Math.abs(dx) > 6) {
      setHasDragged(true);
    }

    const halfWidth = trackRef.current.scrollWidth / 2;
    posRef.current = wrapPosition(startPosRef.current + dx * 1.2, halfWidth);
    trackRef.current.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setTimeout(() => setHasDragged(false), 50);
  };

  return (
    <section className="py-20 w-full" id="projects">
      <h2 className="heading">
        {t.projectsSection.headingPart1}{" "}
        <span className="text-purple">
          {t.projectsSection.headingHighlight}
        </span>
      </h2>

      {/* Overflow-y oluşturmayan, tekerlekle sayfa kaydırmayı engellemeyen kapsayıcı */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handlePointerUp();
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: "pan-y" }}
        className={`relative w-full mt-10 select-none [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)] ${isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
      >
        <div
          ref={trackRef}
          className="flex w-max gap-12 py-10 px-4 will-change-transform"
        >
          {marqueeProjects.map((item, idx) => (
            <div
              className={`lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw] shrink-0 ${hasDragged ? "pointer-events-none" : ""
                }`}
              key={`${item.id}-${idx}`}
            >
              <PinContainer title={t.projectsSection.visit} href={item.href}>
                <div className="relative flex items-center justify-center sm:w-96 w-[75vw] overflow-hidden h-[20vh] lg:h-[28vh] mb-6 rounded-2xl">
                  <div
                    className="relative w-full h-full overflow-hidden lg:rounded-2xl"
                    style={{ backgroundColor: "#13162D" }}
                  >
                    <img
                      src="/bg.png"
                      alt="bgimg"
                      draggable={false}
                      className="w-full h-full object-cover select-none"
                    />
                  </div>
                  <img
                    src={item.img}
                    alt={item.title}
                    draggable={false}
                    className="z-10 absolute inset-0 w-full h-full object-cover object-top rounded-2xl select-none"
                  />
                </div>

                <h3 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                  {item.title}
                </h3>

                <p
                  className="lg:text-base lg:font-normal font-light text-sm line-clamp-2"
                  style={{
                    color: "#BEC1DD",
                    margin: "1vh 0",
                  }}
                >
                  {item.des}
                </p>

                <div className="flex items-center justify-between mt-7 mb-3 gap-2">
                  <div className="flex items-center">
                    {item.iconLists.map((icon, index) => (
                      <div
                        key={index}
                        className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center shrink-0"
                        style={{
                          transform: `translateX(-${5 * index + 2}px)`,
                        }}
                      >
                        <img
                          src={icon}
                          alt="tech-icon"
                          draggable={false}
                          className="p-2 select-none"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center items-center shrink-0">
                    <p className="flex lg:text-base md:text-xs text-sm text-purple whitespace-nowrap">
                      {t.projectsSection.checkLive}
                    </p>
                    <FaLocationArrow className="ms-2 shrink-0" color="#CBACF9" />
                  </div>
                </div>
              </PinContainer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentProjects;