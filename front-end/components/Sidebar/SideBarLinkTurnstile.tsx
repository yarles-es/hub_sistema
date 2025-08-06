import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SideBarLinkTurnstileProps = {
  handleClick: () => void;
  open: boolean;
  sidebarExpanded: boolean;
  setSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  setSidebarOpen: (arg: boolean) => void;
  sidebarOpen: boolean;
};

const SideBarLinkTurnstile: React.FC<SideBarLinkTurnstileProps> = ({
  handleClick,
  open,
  setSidebarExpanded,
  sidebarExpanded,
  setSidebarOpen,
  sidebarOpen,
}) => {
  const pathname = usePathname();

  return (
    <React.Fragment>
      <Link
        href="#"
        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
          (pathname === "/turnstile" || pathname.includes("turnstile")) &&
          "bg-graydark dark:bg-meta-4"
        }`}
        onClick={(e) => {
          e.preventDefault();
          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
        }}
      >
        <svg
          fill="#ffffff"
          width="24"
          height="24"
          viewBox="0 0 50.00 50.00"
          xmlns="http://www.w3.org/2000/svg"
          transform="matrix(-1, 0, 0, 1, 0, 0)"
          stroke="#ffffff"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#ffffff"
            strokeWidth="0.4"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M16 4 A 1.0001 1.0001 0 0 0 15 5L15 11 A 1.0001 1.0001 0 0 0 16 12L19.53125 12C18.791861 12.826587 18.28062 13.861263 18.087891 15L6 15 A 1.0001 1.0001 0 1 0 6 17L18.091797 17C18.245937 17.907603 18.602061 18.746805 19.117188 19.46875L11.292969 27.292969 A 1.0001 1.0001 0 1 0 12.707031 28.707031L20.53125 20.882812C21.253195 21.397939 22.092397 21.754063 23 21.908203L23 34 A 1.0001 1.0001 0 1 0 25 34L25 21.912109C26.139546 21.718171 27.172867 21.203174 28 20.462891L28 38.339844L21.605469 41.080078 A 1.0001 1.0001 0 0 0 21 42L21 45 A 1.0001 1.0001 0 0 0 22 46L39 46 A 1.0001 1.0001 0 0 0 40 45L40 5 A 1.0001 1.0001 0 0 0 39 4L16 4 z M 17 6L38 6L38 44L23 44L23 42.660156L29.394531 39.919922 A 1.0001 1.0001 0 0 0 30 39L30 20 A 1.0001 1.0001 0 0 0 29.707031 19.292969L20.707031 10.292969 A 1.0001 1.0001 0 0 0 20 10L17 10L17 6 z M 30 10 A 1.0001 1.0001 0 1 0 30 12L34 12 A 1.0001 1.0001 0 1 0 34 10L30 10 z M 20.974609 13.388672L26.611328 19.025391C25.934209 19.611373 25.059379 19.969457 24.09375 19.992188 A 1.0001 1.0001 0 0 0 23.984375 19.986328 A 1.0001 1.0001 0 0 0 23.908203 19.990234C22.879738 19.966812 21.955228 19.562451 21.261719 18.910156 A 1.0001 1.0001 0 0 0 21.089844 18.738281C20.43713 18.044327 20.032712 17.119097 20.009766 16.089844 A 1.0001 1.0001 0 0 0 20.009766 15.902344C20.03337 14.937592 20.389262 14.064425 20.974609 13.388672 z"></path>
          </g>
        </svg>
        Catraca
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
              href="/turnstile/settings"
              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                pathname === "/turnstile/settings" && "text-white"
              } `}
            >
              Configurações
            </Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default SideBarLinkTurnstile;
