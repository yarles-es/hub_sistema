type TableProps = {
  children: React.ReactNode;
};

const DefaultTableContainerSecundary: React.FC<TableProps> = ({ children }) => {
  return (
    <div className="ml-10 mr-10 rounded-lg border border-stroke bg-gray px-3 pt-3 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark-2 sm:px-2 xl:pb-3 text-xs">
      <div className="max-w-full">{children}</div>
    </div>
  );
};

export default DefaultTableContainerSecundary;
