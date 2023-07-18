import React from "react";
import { features } from "../constants";
import styles, { layout } from "../style";
import Button from "./Button";

const FeatureCard = ({ icon, title, content, index }) => (
  <div
    className={`flex flex-row p-6 rounded-[20px] ${
      index !== features.length - 1 ? "mb-6" : "mb-0"
    } feature-card`}
  >
    <div
      className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue  `}
    >
      <img src={icon} alt="icon" className="w-[50%] h-[50%] object-contain " />
    </div>
    <div className="flex-1 flex flex-col ml-3  ">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1 ">
        {title}
      </h4>
      <p className="font-poppins font-normal text-[#ededed] text-[16px] leading-[24px] mb-1 ">
        {content}
      </p>
    </div>
  </div>
);

const Business = () => {
  return (
    <section id="features" className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Even the smallest amount, <br className="sm:block hidden" /> can make
          a huge impact.
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5 text-[#ededed] `}>
          Whether it's donating a few dollars to a cause you care about, volunteering your time to help those in need, or simply spreading positivity and support, every action matters. Join us in celebrating the power of collective goodness and discover how together, we can create a ripple effect of positive change that reaches far beyond our wildest imaginations. Embrace your inner hero, and let's embark on this transformative journey to make the world a better place for all.
        </p>

        <Button styles="mt-10" />
      </div>

      <div className={`${layout.sectionImg} flex-col`}>
        {features.map((feature, index) => (
          <FeatureCard key={feature.id} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Business;
