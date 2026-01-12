import { ChangeEvent, forwardRef } from "react";

import { typePlanos } from "@/types/Plano";

import Select from "./Select";

type Props = {
  value: string | "";
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  error?: string | undefined;
  firstOption?: boolean;
};

const SelectTypePlano = forwardRef<HTMLSelectElement, Props>(
  ({ value, onChange, label, error, firstOption = true }, ref) => {
    const formattedOptions = [
      { value: typePlanos.MENSAL, label: typePlanos.MENSAL },
      { value: typePlanos.SEMANAL, label: typePlanos.SEMANAL },
      { value: typePlanos.QUINZENAL, label: typePlanos.QUINZENAL },
    ];

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
            options={formattedOptions}
            value={value}
            onChange={onChange}
            firstOption={firstOption ? "Selecione o tipo do plano" : undefined}
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

SelectTypePlano.displayName = "SelectTypePlano";

export default SelectTypePlano;
