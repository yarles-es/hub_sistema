import { ChangeEvent, forwardRef } from "react";

import { PaymentType } from "@/types/Daily";

import Select from "./Select";

type Props = {
  value: PaymentType | "";
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  error?: string | undefined;
  fristOption?: boolean;
};

const SelectTypePayment = forwardRef<HTMLSelectElement, Props>(
  ({ value, onChange, label, error, fristOption = true }, ref) => {
    const transformStatus = () => {
      return Object.entries(PaymentType).map(([key, value]) => {
        return {
          value: key,
          label: value,
        };
      });
    };

    const options = transformStatus();

    return (
      <>
        <div className="w-full">
          <label
            htmlFor="select-type-additional-boleto-charge"
            className="mb-2.5 block text-black dark:text-white"
          >
            {label}
          </label>
          <Select
            id="select-type-Payment"
            options={options}
            value={value}
            onChange={onChange}
            firstOption={fristOption ? "Selecione o tipo" : undefined}
            ref={ref}
          />
        </div>
        <p className={`text-meta-7 text-xs ${error ? "visible" : "invisible"}`}>
          {error || "erro de validação"}
        </p>
      </>
    );
  }
);

SelectTypePayment.displayName = "SelectTypePayment";

export default SelectTypePayment;
