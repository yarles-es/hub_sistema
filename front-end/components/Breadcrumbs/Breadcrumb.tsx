import Link from "next/link";
interface BreadcrumbProps {
  pageName: string;
  arrayLinks?: string[];
  init?: boolean;
}
const Breadcrumb = ({ pageName, arrayLinks, init }: BreadcrumbProps) => {
  return (
    <div className="mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between items-center">
      <h2 className=" text-title-xsm sm:text-title-sm font-semibold text-black dark:text-white hidden sm:block">
        {pageName}
      </h2>

      {!init ? (
        <nav className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <ol className="flex items-center gap-2">
            <li>
              <Link className="font-medium" href="/">
                Inicio /
              </Link>
            </li>
            {arrayLinks &&
              arrayLinks.map((link, index) => (
                <li key={index}>
                  <Link className="font-medium" href="/">
                    {link} /
                  </Link>
                </li>
              ))}
            <li className="font-medium text-primary">{pageName}</li>
          </ol>
        </nav>
      ) : (
        <nav className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <ol className="flex items-center gap-2">
            {arrayLinks &&
              arrayLinks.map((link, index) => (
                <li key={index}>
                  <Link className="font-medium" href="/">
                    {link} /
                  </Link>
                </li>
              ))}
            <li className="font-medium text-primary">{pageName}</li>
          </ol>
        </nav>
      )}
    </div>
  );
};

export default Breadcrumb;
