/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState, useEffect } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { useLanguage } from "@/context/LanguageContext";
import { PinContainer } from "./ui/Pin";

const RecentProjects = () => {
  const { t } = useLanguage();
  // Kesintisiz (seamless) sonsuz döngü için listeyi iki kez birleştiriyoruz
  const marqueeProjects = [...t.projects, ...t.projects];

  const sliderRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Otomatik kayma hızı (Piksel / Kare). Hızı artırmak için 1.2, yavaşlatmak için 0.5 yapabilirsin.
  // Yön: Soldan sağa akış için negatif (-0.8), sağdan sola akış için pozitif (0.8) kullanabilirsin.
  const SPEED = -0.8;

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Soldan sağa akışta başlangıçta sınırda kalmamak için ortadan başlatıyoruz
    if (slider.scrollLeft === 0 && SPEED < 0) {
      slider.scrollLeft = slider.scrollWidth / 2;
    }

    let animationFrameId: number;

    const animate = () => {
      if (!isHovered && !isDragging && slider) {
        slider.scrollLeft += SPEED;

        const halfWidth = slider.scrollWidth / 2;
        // Sonsuz döngü sınır kontrolü (kullanıcı hissetmeden başa/ortaya sarar)
        if (slider.scrollLeft >= halfWidth) {
          slider.scrollLeft -= halfWidth;
        } else if (slider.scrollLeft <= 0) {
          slider.scrollLeft += halfWidth;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, isDragging, SPEED]);

  // Sonsuz döngünün manuel sürükleme sırasında da kopmamasını sağlar
  const normalizeInfiniteScroll = (slider: HTMLDivElement) => {
    const halfWidth = slider.scrollWidth / 2;
    if (slider.scrollLeft >= halfWidth) {
      slider.scrollLeft -= halfWidth;
      setScrollLeftState(slider.scrollLeft);
      setStartX((prev) => prev);
    } else if (slider.scrollLeft <= 0) {
      slider.scrollLeft += halfWidth;
      setScrollLeftState(slider.scrollLeft);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeftState(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Sürükleme hassasiyeti çarpanı

    // 5px'ten fazla hareket edildiyse bunun bir tıklama değil sürükleme olduğunu işaretle
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }

    sliderRef.current.scrollLeft = scrollLeftState - walk;
    normalizeInfiniteScroll(sliderRef.current);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setHasDragged(false), 50);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
    setTimeout(() => setHasDragged(false), 50);
  };

  return (
    <section className="py-20 w-full overflow-hidden" id="projects">
      <h2 className="heading">
        {t.projectsSection.headingPart1}{" "}
        <span className="text-purple">
          {t.projectsSection.headingHighlight}
        </span>
      </h2>

      {/* Sürüklenebilir & Otomatik Kayan Şerit Kapsayıcısı */}
      <div
        ref={sliderRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        className={`relative w-full mt-10 overflow-x-scroll no-scrollbar select-none [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)] ${isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="flex w-max gap-12 py-10 px-4">
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