type TableProps = {
  children: React.ReactNode;
  maxH?: string;
  maxW?: string;
  table?: boolean;
};

const DefaultFormTableContainer: React.FC<TableProps> = ({
  children,
  maxH,
  maxW = "max-w-full",
  table = true,
}) => {
  const component = table ? (
    <table className="w-full  table-auto min-w-max">{children}</table>
  ) : (
    <div className="w-full  table-auto min-w-max">{children}</div>
  );

  return (
    <div className="text-xs rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-2 xl:pb-3 mb-5">
      <div className={`overflow-x-auto overflow-y-auto ${maxH} ${maxW}`}>
        {component}
      </div>
    </div>
  );
};

export default DefaultFormTableContainer;
