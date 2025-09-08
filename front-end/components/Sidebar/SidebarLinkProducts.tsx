import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBarLinkProducts: React.FC = () => {
  const pathname = usePathname();

  return (
    <React.Fragment>
      <Link
        href="/products"
        className={`group relative flex items-end gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
          pathname.includes("products") && "bg-graydark dark:bg-meta-4"
        }`}
      >
        <svg
          fill="#ffffff"
          width="23"
          height="23"
          viewBox="0 0 24 24"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke="#CCCCCC"
            stroke-width="0.384"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <title></title>{" "}
            <g
              fill="none"
              fill-rule="evenodd"
              id="页面-1"
              stroke="none"
              stroke-width="1"
            >
              {" "}
              <g id="导航图标" transform="translate(-325.000000, -80.000000)">
                {" "}
                <g id="编组" transform="translate(325.000000, 80.000000)">
                  {" "}
                  <polygon
                    fill="#FFFFFF"
                    fill-opacity="0.01"
                    fill-rule="nonzero"
                    id="路径"
                    points="24 0 0 0 0 24 24 24"
                  ></polygon>{" "}
                  <polygon
                    id="路径"
                    points="22 7 12 2 2 7 2 17 12 22 22 17"
                    stroke="#ffffff"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  ></polygon>{" "}
                  <line
                    id="路径"
                    stroke="#ffffff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    x1="2"
                    x2="12"
                    y1="7"
                    y2="12"
                  ></line>{" "}
                  <line
                    id="路径"
                    stroke="#ffffff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    x1="12"
                    x2="12"
                    y1="22"
                    y2="12"
                  ></line>{" "}
                  <line
                    id="路径"
                    stroke="#ffffff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    x1="22"
                    x2="12"
                    y1="7"
                    y2="12"
                  ></line>{" "}
                  <line
                    id="路径"
                    stroke="#ffffff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    x1="17"
                    x2="7"
                    y1="4.5"
                    y2="9.5"
                  ></line>{" "}
                </g>{" "}
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
        Produtos
      </Link>
    </React.Fragment>
  );
};

export default SideBarLinkProducts;
