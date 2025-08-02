import { Title } from "@/types/Tables";

// desestruturação de um objeto de chaves específicas;
const setValueBySpecificKey = (title: string, data: any) => {
  if (title === "father" && data) {
    return data?.father?.name ? data.father.name : "";
  } else {
    return data[title];
  }
};

// função auxiliar para ordenar a tabela por tipo number;
const sortTableByTypeNumber = (a: number, b: number) => {
  return a - b;
};

// função auxiliar para ordenar a tabela por tipo string;
const sortTableByTypeString = (a: string, b: string) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

// função auxiliar para ordenar a tabela por tipo data;
const sortTableByDate = (a: string, b: string) => {
  const dateA = new Date(a);
  const dateB = new Date(b);

  if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
    // Trata datas inválidas (pode ordenar para o final, por exemplo)
    return 0;
  }

  return dateA.getTime() - dateB.getTime();
};

// função auxiliar para ordenar a tabela por tipo boolean;
const sortTableByTypeBoo = (a: boolean, b: boolean) => {
  return b === a ? 0 : b ? -1 : 1;
};

// função principal para ordenar a tabela por coluna;
function sortTableByColumn<T>({
  titles,
  clickedKey,
  data,
  reverse = false,
}: {
  titles: Title[];
  clickedKey: string;
  data: T[];
  reverse?: boolean;
}): T[] {
  const title = titles.find((title) => title.key === clickedKey);

  if (!title) return data;
  if (title.order) {
    data.sort((a, b) => {
      const valueA = setValueBySpecificKey(clickedKey, a);
      const valueB = setValueBySpecificKey(clickedKey, b);
      if (title.type === "string") return sortTableByTypeString(valueA, valueB);
      if (title.type === "number")
        return sortTableByTypeNumber(Number(valueA), Number(valueB));
      if (title.type === "boolean") return sortTableByTypeBoo(valueA, valueB);
      if (title.type === "date") return sortTableByDate(valueA, valueB);
      return 0;
    });
  } else {
    return data;
  }

  return reverse ? data.reverse() : data;
}

export default sortTableByColumn;
