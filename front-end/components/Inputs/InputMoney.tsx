import { eventNames } from "process";

import React, {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";

type InputProps = {
  label?: string;
  error?: string;
  externalValue?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const MoneyInput = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, id, name, type, onChange, externalValue, ...props },
    ref
  ) => {
    const [value, setValue] = useState("R$ 0,00");

    const formatNumber = (inputValue: string) => {
      const numericValue = parseInt(inputValue.replace(/\D/g, ""), 10) / 100;
      return numericValue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    };

    useEffect(() => {
      externalValue
        ? setValue(formatNumber(externalValue))
        : setValue("R$ 0,00");
    }, [externalValue]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = event.target.value.replace(/[^0-9]/g, "");
      let newFormattedNumber = "";
      if (rawValue.length >= 3) {
        newFormattedNumber = rawValue.slice(0, -2) + "." + rawValue.slice(-2);
      } else {
        const paddedValue = rawValue.padStart(3, "0");
        newFormattedNumber =
          paddedValue.slice(0, -2) + "." + paddedValue.slice(-2);
      }
      const formattedValue = formatNumber(newFormattedNumber);
      setValue(formattedValue);

      if (onChange) {
        const newEvent = {
          ...event,
          target: {
            ...event.target,
            name: event.target.name,
            value: newFormattedNumber,
          },
          currentTarget: {
            ...event.currentTarget,
            value: newFormattedNumber,
          },
        };
        onChange(newEvent as React.ChangeEvent<HTMLInputElement>);
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

        <div className="relative">
          <input
            {...props}
            id={id}
            name={name}
            ref={ref}
            type="tel"
            value={value}
            onChange={handleChange}
            className={` w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
          />
        </div>

        <p className={`text-meta-7 text-xs ${error ? "visible" : "invisible"}`}>
          {error || "erro de validação"}
        </p>
      </>
    );
  }
);

MoneyInput.displayName = "MoneyInput";

export default MoneyInput;
