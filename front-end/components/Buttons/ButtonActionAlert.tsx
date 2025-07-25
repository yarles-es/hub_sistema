import React from "react";

type ButtonActionEditProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

const ButtonActionAlert = ({ className, ...props }: ButtonActionEditProps) => {
  const combinedClassName = className ? className : "hover:text-danger";

  return (
    <button className={combinedClassName} {...props}>
      <svg
        className="fill-current"
        version="1.1"
        id="XMLID_296_"
        viewBox="0 0 24 24"
        width="22px"
        height="22px"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <g id="alert">
            {" "}
            <g>
              {" "}
              <g>
                {" "}
                <path d="M12,5.2L20.6,21H3.3L12,5.2 M12,1L0,23h24L12,1L12,1z"></path>{" "}
              </g>{" "}
            </g>{" "}
            <g>
              {" "}
              <rect x="11" y="10" width="2" height="6"></rect>{" "}
            </g>{" "}
            <g>
              {" "}
              <rect x="11" y="17" width="2" height="2"></rect>{" "}
            </g>{" "}
          </g>{" "}
        </g>
      </svg>
    </button>
  );
};

export default ButtonActionAlert;
