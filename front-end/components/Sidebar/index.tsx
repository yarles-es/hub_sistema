import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import SideBarLinkClients from "./SideBarLinkClients";
import SideBarLinkFinance from "./SideBarLinkFinance";
import SidebarLinkGroup from "./SidebarLinkGroup";
import SideBarLinkPlans from "./SideBarLinkPlans";
import SideBarLinkProducts from "./SidebarLinkProducts";
import SideBarLinkSettings from "./SideBarLinkSettings";
import SideBarLinkTurnstile from "./SideBarLinkTurnstile";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-[100dvh] w-60 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark xlg:static xlg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-1 xlg:py-0 mb-7 mt-7">
        <Link href="/">
          <Image
            priority
            width={250}
            height={250}
            src={"/erp-academia/images/logo/nova_meta.png"}
            alt="Logo ERP Academia"
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block xlg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-0 px-4 xlg:mt-0 xlg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className=" mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/finance" || pathname.includes("finance")
                }
              >
                {(handleClick, open) => (
                  <SideBarLinkFinance
                    handleClick={handleClick}
                    open={open}
                    setSidebarExpanded={setSidebarExpanded}
                    sidebarExpanded={sidebarExpanded}
                    setSidebarOpen={setSidebarOpen}
                    sidebarOpen={sidebarOpen}
                  />
                )}
              </SidebarLinkGroup>

              <SideBarLinkClients />

              <SideBarLinkPlans />
              <SideBarLinkProducts />

              <SideBarLinkTurnstile />

              <SidebarLinkGroup
                activeCondition={
                  pathname === "/settings" || pathname.includes("settings")
                }
              >
                {(handleClick, open) => (
                  <SideBarLinkSettings
                    handleClick={handleClick}
                    open={open}
                    setSidebarExpanded={setSidebarExpanded}
                    sidebarExpanded={sidebarExpanded}
                    setSidebarOpen={setSidebarOpen}
                    sidebarOpen={sidebarOpen}
                  />
                )}
              </SidebarLinkGroup>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
