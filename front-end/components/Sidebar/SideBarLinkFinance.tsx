import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SideBarLinkFinanceProps = {
  handleClick: () => void;
  open: boolean;
  sidebarExpanded: boolean;
  setSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  setSidebarOpen: (arg: boolean) => void;
  sidebarOpen: boolean;
};

const SideBarLinkFinance: React.FC<SideBarLinkFinanceProps> = ({
  handleClick,
  open,
  sidebarExpanded,
  setSidebarExpanded,
  setSidebarOpen,
  sidebarOpen,
}) => {
  const pathname = usePathname();

  return (
    <React.Fragment>
      <Link
        href="#"
        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
          (pathname === "/finance" || pathname.includes("finance")) &&
          "bg-graydark dark:bg-meta-4"
        }`}
        onClick={(e) => {
          e.preventDefault();
          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="#ffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 3v18h18" />
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
        </svg>
        Financeiro
        <svg
          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
            open && "rotate-180"
          }`}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
            fill=""
          />
        </svg>
      </Link>
      <div
        className={`translate transform overflow-hidden ${!open && "hidden"}`}
      >
        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
          <li>
            <Link
              onClick={(e) => setSidebarOpen(!sidebarOpen)}
              href="/finance/daily"
              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                pathname === "/finance/daily" && "text-white"
              } `}
            >
              Diárias
            </Link>
          </li>
          <li>
            <Link
              onClick={(e) => setSidebarOpen(!sidebarOpen)}
              href="/finance/monthly-fee"
              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                pathname === "/finance/monthly-fee" && "text-white"
              } `}
            >
              Mensalidades
            </Link>
          </li>
          <li>
            <Link
              onClick={(e) => setSidebarOpen(!sidebarOpen)}
              href="/finance/sales-report"
              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                pathname === "/finance/sales-report" && "text-white"
              } `}
            >
              R. Vendas
            </Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default SideBarLinkFinance;
