import React from "react";

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

const MAX_PHONE_DIGITS = 11;

const formatPhone = (phoneValue = "") => {
  const digits = phoneValue.replace(/\D/g, "").slice(0, MAX_PHONE_DIGITS);

  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
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
      value = "",
      onChange,
      onBlur,
    },
    ref
  ) => {
    const formattedValue = formatPhone(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
    };

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
          <input
            ref={ref}
            id={id}
            name={name}
            placeholder={placeholder}
            type="text"
            inputMode="numeric"
            autoComplete="tel"
            maxLength={15}
            value={formattedValue}
            onChange={handleChange}
            onBlur={onBlur}
            className={`${className} w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
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

InputPhone.displayName = "InputPhone";

export default InputPhone;
