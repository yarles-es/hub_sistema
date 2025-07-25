import React from "react";
import "./style.css";

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
      <span className="loader"></span>
    </div>
  );
};

export default LoaderRHM;
