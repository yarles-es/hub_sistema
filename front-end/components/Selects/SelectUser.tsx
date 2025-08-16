import { ChangeEvent, forwardRef } from "react";

import { useQuery } from "@tanstack/react-query";

import Select from "./Select";

import { findAllUsers } from "@/api/users/user.api";

type Props = {
  value: string | "";
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  error?: string | undefined;
  firstOption?: boolean;
};

const SelectUser = forwardRef<HTMLSelectElement, Props>(
  ({ value, onChange, label, error, firstOption = true }, ref) => {
    const { data: users } = useQuery({
      queryKey: ["usuarios"],
      queryFn: async () => await findAllUsers(),
      select: (data) =>
        data.map((user) => ({
          label: user.nome.trim(),
          value: user.id.toString(),
        })),
      retry: 0,
      staleTime: 0,
    });

    const formattedOptions = users || [];

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
            id="select-user"
            options={formattedOptions}
            value={value}
            onChange={onChange}
            firstOption={firstOption ? "Selecione o Usuário" : undefined}
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

SelectUser.displayName = "SelectUser";

export default SelectUser;
