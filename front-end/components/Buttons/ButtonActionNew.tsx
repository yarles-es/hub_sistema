import React from "react";

type ButtonActionAddProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};
const ButtonActionNew = ({ className, ...props }: ButtonActionAddProps) => {
  const combinedClassName = className ? className : "hover:text-primary";
  return (
    <button {...props} className={combinedClassName}>
      <svg
        className="fill-current"
        width="16px"
        height="16px"
        viewBox="0 0 21 21"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#CCCCCC"
          strokeWidth="0.9600000000000002"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <rect x="0" fill="none" width="24" height="24"></rect>{" "}
          <g>
            {" "}
            <path d="M21 14v5c0 1.105-.895 2-2 2H5c-1.105 0-2-.895-2-2V5c0-1.105.895-2 2-2h5v2H5v14h14v-5h2z"></path>{" "}
            <path d="M21 7h-4V3h-2v4h-4v2h4v4h2V9h4"></path>{" "}
          </g>{" "}
        </g>
      </svg>
    </button>
  );
};

export default ButtonActionNew;
