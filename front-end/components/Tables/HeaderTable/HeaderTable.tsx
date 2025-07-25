import React, { ReactNode } from "react";

type HeaderTableProps = {
  children: ReactNode;
  viewHeader?: boolean;
};

const HeaderTable: React.FC<HeaderTableProps> = ({ children, viewHeader }) => {
  if (!viewHeader) return null;
  return (
    <header className="sticky top-0 flex w-full rounded-md bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none border overflow-y-auto max-h-60">
      <div className="flex flex-grow items-center justify-between px-2 py-1 shadow-2">
        <div className="w-full flex justify-center items-center gap-2 sm:gap-5 lg:justify-normal text-sm sm:text-base whitespace-nowrap">
          {children}
        </div>
      </div>
    </header>
  );
};

export default HeaderTable;
