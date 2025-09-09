import { ChangeEvent, forwardRef } from "react";

import { useQuery } from "@tanstack/react-query";

import { getAllPlans } from "@/api/plano/plano.api";

import Select from "./Select";

type Props = {
  value: string | "";
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  error?: string | undefined;
  firstOption?: boolean;
};

const SelectPlano = forwardRef<HTMLSelectElement, Props>(
  ({ value, onChange, label, error, firstOption = true }, ref) => {
    const { data: options } = useQuery({
      queryKey: ["planos"],
      queryFn: async () => await getAllPlans(),
      select: (data) =>
        data.map((plano) => ({
          value: plano.id.toString(),
          label: plano.nome.trim().toUpperCase(),
        })),
      retry: 0,
      staleTime: 0,
    });

    const formattedOptions = options || [];

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
            firstOption={firstOption ? "Selecione o plano" : undefined}
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

SelectPlano.displayName = "SelectPlano";

export default SelectPlano;
