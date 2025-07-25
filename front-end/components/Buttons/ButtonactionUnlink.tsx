import React from "react";

type ButtonActionDiscountProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
  };
const ButtonActionUnlink = ({
  className,
  ...props
}: ButtonActionDiscountProps) => {
  const combinedClassName = className ? className : "hover:text-primary";
  return (
    <button {...props} className={combinedClassName}>
      <svg
        className="fill-current"
        width="16px"
        height="16px"
        viewBox="0 0 23 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path d="M15 12.75C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H15Z"></path>{" "}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z"
          ></path>{" "}
        </g>
      </svg>
    </button>
  );
};

export default ButtonActionUnlink;
