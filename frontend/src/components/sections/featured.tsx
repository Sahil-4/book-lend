"use client";

import Image from "next/image";
import styles from "@/styles/components/sections/featured.module.css";
import { useCallback, useEffect, useState } from "react";

const Featured = () => {
  const [featuredsIndex, setFeaturedsIndex] = useState<number>(0);

  const featureds = [
    { key: "501", name: "Image 1", url: "/image-1.png" },
    { key: "502", name: "Image 2", url: "/image-2.png" },
  ];

  const selectNextSlide = useCallback(() => {
    setFeaturedsIndex((featuredsIndex + 1) % featureds.length);
  }, [featureds.length, featuredsIndex]);

  useEffect(() => {
    const tid = setInterval(() => {
      selectNextSlide();
    }, 1000 * 3);

    return () => clearInterval(tid);
  }, [selectNextSlide]);

  return (
    <section className={styles.featured_section}>
      {featureds.map((feat, index) => {
        return (
          <div
            className={`${styles.featured_section__image_container} ${
              featuredsIndex != index ? "_hidden_" : ""
            }`}
            key={feat.key}>
            <Image alt={feat.name} src={feat.url} fill={true} />
          </div>
        );
      })}
    </section>
  );
};

export default Featured;
