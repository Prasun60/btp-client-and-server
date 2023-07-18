import React from "react";
import styles from "../style";
import Button from "./Button";
import {Link} from "react-router-dom";

const CTA = () => {
  return (
    <scetion
      className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow `}
    >
      <div className="flex-1 flex flex-col">
        <h2 className={`${styles.heading2}`}>Donate Now!!</h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5 text-[#ededed]`}>
        Join the movement of compassion and impact lives today! Your donation can spark a chain reaction of positive change, providing hope and opportunity where it's needed most. Together, we can create a brighter future for those in need, igniting hope and inspiring transformation. Every dollar counts – be a part of something extraordinary and donate now!
        </p>
      </div>

      <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
     <Link to="/signup" className="link">
            <Button />
          </Link>
      </div>
    </scetion>
  );
};

export default CTA;
