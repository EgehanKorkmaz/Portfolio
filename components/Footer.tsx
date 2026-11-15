"use client";

import { FaLocationArrow, FaWhatsapp, FaPhone } from "react-icons/fa6";
import { socialMedia } from "@/data";
import { useLanguage } from "@/context/LanguageContext";
import MagicButton from "./MagicButton";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      <div className="flex flex-col items-center">
        <h2 className="heading lg:max-w-[45vw]">
          {t.footer.headingPart1}{" "}
          <span className="text-purple">{t.footer.headingHighlight}</span>{" "}
          {t.footer.headingPart2}
        </h2>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          {t.footer.description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 w-full">
          <a href="mailto:egehankrkmz@gmail.com">
            <MagicButton
              title={t.footer.emailBtn}
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
          <a href="tel:+905073622107">
            <MagicButton
              title={t.footer.callBtn}
              icon={<FaPhone />}
              position="right"
            />
          </a>
          <a
            href="https://wa.me/905073622107"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MagicButton
              title={t.footer.whatsappBtn}
              icon={<FaWhatsapp className="text-lg text-emerald-400" />}
              position="right"
            />
          </a>
        </div>
      </div>

      <div className="flex mt-16 md:flex-row flex-col justify-between items-center gap-4">
        <p className="md:text-base text-sm md:font-normal font-light">
          {t.footer.copyright}
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <a
              key={info.id}
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 cursor-pointer flex justify-center 
              items-center backdrop-filter backdrop-blur-lg saturate-180 
              bg-opacity-75 bg-black-200 rounded-lg border border-black-300 hover:border-purple transition-colors"
            >
              <img src={info.img} alt="social-icon" width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;