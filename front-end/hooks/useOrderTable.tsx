import { useMemo, useState } from "react";

import { Title } from "@/types/Tables";
import sortTableByColumn from "@/utils/orderTableWithColun";

type TableProps<T> = {
  data: T[];
  titles: Title[];
};

type ClickedKeyReverse = {
  clickedKey: string;
  reverse: boolean;
};

const useOrderTable = <T,>({ data, titles }: TableProps<T>) =>  {
  const [clickedKeyReverse, setClickedKeyReverse] = useState<ClickedKeyReverse>(
    {
      clickedKey: "",
      reverse: false,
    }
  );

  const dataOrder = useMemo(() => {
    return sortTableByColumn({
      titles,
      clickedKey: clickedKeyReverse.clickedKey,
      data,
      reverse: clickedKeyReverse.reverse,
    });
  }, [data, clickedKeyReverse, titles]);

  const handleOrder = (clickedKey: string) => {
    setClickedKeyReverse((prev) => ({
      clickedKey,
      reverse: clickedKey === prev.clickedKey ? !prev.reverse : false,
    }));
  };

  return { dataOrder, handleOrder };
};

export default useOrderTable;
