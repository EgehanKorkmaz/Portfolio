"use client";

import { useLanguage } from "@/context/LanguageContext";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";

const Grid = () => {
  const { t } = useLanguage();

  return (
    <section id="about">
      <BentoGrid className="w-full py-20">
        {t.gridItems.map((item, i) => (
          <BentoGridItem
            id={item.id}
            key={i}
            title={item.title}
            description={item.description}
            className={item.className}
            img={item.img}
            imgClassName={item.imgClassName}
            titleClassName={item.titleClassName}
            spareImg={item.spareImg}
          />
        ))}
      </BentoGrid>
    </section>
  );
};

export default Grid;