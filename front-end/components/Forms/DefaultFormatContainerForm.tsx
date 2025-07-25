type DefaultFormatContainerFormProps = {
  children: React.ReactNode;
  title?: string | React.ReactNode;
};

const DefaultFormatContainerForm: React.FC<DefaultFormatContainerFormProps> = ({
  children,
  title,
}) => {
  return (
    <div className="mx-auto">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          {title && (
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {title}
              </h3>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default DefaultFormatContainerForm;
