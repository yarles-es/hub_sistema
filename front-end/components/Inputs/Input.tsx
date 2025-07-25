import React, { forwardRef, InputHTMLAttributes, useState } from "react";

type InputProps = {
  label?: string;
  error?: string;
  errorClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, errorClassName, error, id, name, type, onChange, ...props },
    ref
  ) => {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (type === "number" && !/^\d*\.?\d*$/.test(value)) {
        e.preventDefault();
        return;
      }

      setInputValue(value);

      if (onChange) {
        onChange(e);
      }
    };

    return (
      <>
        {label && (
          <label
            className={`mb-2.5 block text-black dark:text-white`}
            htmlFor={id}
          >
            {label ?? ""}
          </label>
        )}
        <div className="flex flex-col">
          <input
            id={id}
            name={name}
            ref={ref}
            type={type === "number" ? "text" : type}
            value={inputValue}
            onChange={handleChange}
            {...props}
            className={`${props.className} w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
          />
          <p
            className={`text-meta-7 text-xs ${
              error ? "visible" : "invisible"
            } ${errorClassName}`}
          >
            {error || "erro de validação"}
          </p>
        </div>
      </>
    );
  }
);
Input.displayName = "Input";

export default Input;
