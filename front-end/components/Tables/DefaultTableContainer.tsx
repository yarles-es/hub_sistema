type TableProps = {
  children: React.ReactNode;
};

const DefaultTableContainer: React.FC<TableProps> = ({ children }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-1.5 shadow-default dark:border-strokedark dark:bg-boxdark text-xs overflow-y-auto h-[calc(100dvh-175px)] md:h-[calc(100vh-200px)]  overscroll-none">
      {children}
    </div>
  );
};

export default DefaultTableContainer;
