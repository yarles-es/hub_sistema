import "./style.css";
import React from "react";

import Image from "next/image";

import icon from "./logoRHM.svg";

type LoaderRHMProps = {
  position?: "absolute" | "fixed";
  opacity?: number;
};

const LoaderRHM: React.FC<LoaderRHMProps> = ({ position, opacity }) => {
  return (
    <div
      className={`${
        position ?? "absolute"
      } spinner-container  bg-black bg-opacity-${opacity ?? 30} max-w-full`}
    >
      <div className="opposites ">
        <div className="opposites bl"></div>
        <div className="opposites tr"></div>
        <div className="opposites br">
          <Image style={{ borderRadius: "5px" }} src={icon} alt="iconeRHM" />
        </div>
        <div className="opposites tl"></div>
      </div>
    </div>
  );
};

export default LoaderRHM;
