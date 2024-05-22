import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Pagination = ({ pageNum, page }: { pageNum: number; page: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // update URL paramèters
  const setPageNum = (page: number) => {
    const param = new URLSearchParams(searchParams);
    param.set("page", page.toString());
    replace(`${pathname}?${param.toString()}`);
  };
  return (
    <div className="space-x-2 mt-5">
      <button
        disabled={page <= 1}
        className="btn sm:btn-sm btn-xs btn-primary"
        onClick={() => {
          if (page > 1) setPageNum(page - 1);
        }}
      >
        Previous
      </button>
      <button
        disabled={page >= pageNum}
        className="btn sm:btn-sm btn-xs btn-primary"
        onClick={() => {
          if (page < pageNum) setPageNum(page + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
