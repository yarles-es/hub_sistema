import { ChangeEvent, forwardRef } from "react";

import Select from "./Select";

import { StatusClientEnum } from "@/types/Client";

type Props = {
  value: StatusClientEnum | "";
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  error?: string | undefined;
  fristOption?: boolean;
};

const SelectStatusClient = forwardRef<HTMLSelectElement, Props>(
  ({ value, onChange, label, error, fristOption = true }, ref) => {
    const transformStatus = () => {
      return Object.entries(StatusClientEnum).map(([key, value]) => {
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
            firstOption={fristOption ? "Selecione o status" : undefined}
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

SelectStatusClient.displayName = "SelectStatusClient";

export default SelectStatusClient;
