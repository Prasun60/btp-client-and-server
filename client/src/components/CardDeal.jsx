import React from "react";
import { card } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";
import { middday } from "../assets";

const CardDeal = () => {
  return (
    <section className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          A small place where <br className="sm:block hidden" /> Healing begins.
        </h2>
        <p className={`${styles.paragraph} text-[#ededed] max-w-[470px] mt-5`}>
        Whether you seek emotional, mental, or spiritual healing, our compassionate team is here to walk alongside you, offering therapeutic techniques, mindfulness practices, and a listening ear. No matter how broken you may feel, remember that healing begins with the smallest steps, and here, in this small place, we'll help you find the strength to grow, transform, and embrace a brighter, healthier future. Take that courageous step and let the healing begin.
        </p>
        <Button styles="mt-10 rounded-[10px]" />
      </div>

      <div className={layout.sectionImg} >
        <img src={middday} alt="card" className="w-[100%] h-[100%] " style={{"borderRadius":"53% 47% 38% 62% / 71% 56% 44% 29% ","position":"absolute","zIndex":"10","height":"500px"}} />
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient " />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full bottom-40 white__gradient " />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient " />
      </div>
    </section>
  );
};

export default CardDeal;
