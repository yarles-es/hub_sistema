import React from "react";

import InputMask from "react-input-mask";

type InputPhoneProps = {
  label?: string;
  error?: string;
  errorClassName?: string;
  className?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const InputPhone = React.forwardRef<HTMLInputElement, InputPhoneProps>(
  (
    {
      label,
      error,
      errorClassName = "",
      className = "",
      id,
      name,
      placeholder,
      value,
      onChange,
      onBlur,
    },
    ref
  ) => {
    return (
      <>
        {label && (
          <label
            className="mb-2.5 block text-black dark:text-white"
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <div className="flex flex-col">
          <InputMask
            mask="(99) 99999-9999"
            maskChar={null}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          >
            {(inputProps: any) => (
              <input
                {...inputProps}
                ref={ref}
                id={id}
                name={name}
                placeholder={placeholder}
                type="text"
                className={`${className} w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
              />
            )}
          </InputMask>

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

InputPhone.displayName = "InputPhone";

export default InputPhone;
