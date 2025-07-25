// <-------tipagem das tabelas-------->

export type TypeTitle = "number" | "string" | "boolean" | "actions" | "date";

export type Title = {
  key: string;
  label: string;
  type: TypeTitle;
  order: boolean;
};
