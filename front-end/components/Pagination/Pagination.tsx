import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import {
  ELLIPSIS_LEFT,
  ELLIPSIS_RIGHT,
  usePagination,
} from "@/hooks/usePagination";

type PaginationProps = {
  page: number;
  limit: number;
  total: number;
  className?: string;
};

const Pagination = ({ page, limit, total, className }: PaginationProps) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const { pages } = usePagination({ page, limit, total });

  const generateUrl = (pageNum: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNum.toString());
    return `${pathName}?${params.toString()}`;
  };

  return (
    <div className={`inset-x-0 flex justify-center ${className || ""}`}>
      <ul className="flex list-none p-0 space-x-1">
        {pages.map((pageNum) => {
          const isActive = pageNum === page;
          const isEllipsis =
            pageNum === ELLIPSIS_LEFT || pageNum === ELLIPSIS_RIGHT;

          if (isEllipsis) {
            return (
              <li key={pageNum}>
                <p className="text-sm px-2 py-1 leading-none text-gray-500">
                  ...
                </p>
              </li>
            );
          }

          return (
            <li key={pageNum}>
              <Link href={generateUrl(pageNum)}>
                <p
                  className={`text-sm px-2 py-1 leading-none ${
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "text-gray-500 hover:text-blue-600"
                  }`}
                >
                  {pageNum}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
