import React from "react";
import styles from "../style";
import { arrowUp } from "../assets";
import Popup from "reactjs-popup";
import "./modal.css";

const GetStarted = () => {
  return (
    <Popup
      trigger={
        <div
          className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-blue-gradient p-[2px] cursor-pointer`}
        >
          <div
            className={`${styles.flexCenter} flex-col bg-primary w-[100%] h-[100%] rounded-full`}
          >
            <div className={`${styles.flexStart} flex-row`}>
              <p className="font-poppins font-medium text-[18px] leading-[23px] mr-2">
                <span className="text-gradient">Watch</span>
              </p>
              <img
                src={arrowUp}
                alt="arrow"
                className="w-[23px] h-[23px] object-contain"
              />
            </div>

            <p className="font-poppins font-medium text-[18px] leading-[23px]">
              <span className="text-gradient">a Demo!!</span>
            </p>
          </div>
        </div>
      }
      modal
      nested
    >
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header" style={{"color":"white"}}> Roto Fund </div>
          <div className="content">
            {" "}
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/jdLC2diEInQ"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>{" "}
          </div>
          <div className="actions">
            <button
              className="button"
              style={{"color":"white"}}
              onClick={() => {
                console.log("modal closed ");
                close();
              }}
            >
              close modal
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default GetStarted;
