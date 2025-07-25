import React, { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode | string;
  header?: boolean;
  primary?: boolean;
  danger?: boolean;
  warning?: boolean;
  success?: boolean;
  info?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  header,
  primary,
  danger,
  warning,
  success,
  info,
  ...props
}) => {
  const defaultHeaderClass =
    "inline-flex items-center justify-center rounded-md bg-black py-1.5 px-5 text-center font-medium text-white hover:bg-opacity-80 lg:px-5 xl:px-5 ";

  const selectTypeClassName = () => {
    if (props.disabled) return "bg-body text-white font-medium ";
    if (primary)
      return "bg-primary text-white font-medium active:bg-opacity-90 ";
    if (danger) return "bg-danger text-white font-medium active:bg-opacity-90 ";
    if (warning)
      return "bg-warning text-white font-medium active:bg-opacity-90 ";
    if (success)
      return "bg-success text-white font-medium active:bg-opacity-90 ";
    if (info) return "bg-info text-white font-medium active:bg-opacity-90 ";
    return "";
  };

  const combineClassName = () => {
    if (header) {
      return defaultHeaderClass;
    }
    return `${className} ${selectTypeClassName()}`;
  };

  return (
    <button {...props} className={combineClassName()}>
      <strong>{children}</strong>
    </button>
  );
};

export default Button;
