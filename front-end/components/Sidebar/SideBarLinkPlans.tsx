import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBarLinkPlans = () => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href="/plans"
        className={`group relative flex items-end gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
          pathname.includes("plans") && "bg-graydark dark:bg-meta-4"
        }`}
      >
        <svg
          viewBox="0 0 25 25"
          width="21"
          height="21"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <g
              id="Page-1"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              {" "}
              <g
                id="Dribbble-Light-Preview"
                transform="translate(-59.000000, -240.000000)"
                fill="#ffffff"
              >
                {" "}
                <g id="icons" transform="translate(56.000000, 160.000000)">
                  {" "}
                  <path
                    d="M16.65,98 L21.9,98 L21.9,93 L16.65,93 L16.65,98 Z M14.55,100 L24,100 L24,91 L14.55,91 L14.55,100 Z M5.1,98 L10.35,98 L10.35,93 L5.1,93 L5.1,98 Z M3,100 L12.45,100 L12.45,91 L3,91 L3,100 Z M16.65,87 L21.9,87 L21.9,82 L16.65,82 L16.65,87 Z M14.55,89 L24,89 L24,80 L14.55,80 L14.55,89 Z M5.1,87 L10.35,87 L10.35,82 L5.1,82 L5.1,87 Z M3,89 L12.45,89 L12.45,80 L3,80 L3,89 Z"
                    id="grid_system-[#ffffff]"
                  >
                    {" "}
                  </path>{" "}
                </g>{" "}
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
        Planos
      </Link>
    </li>
  );
};

export default SideBarLinkPlans;
