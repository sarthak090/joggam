/* eslint-disable */

import React from "react";
interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  paginate: (pgNumb: number) => void;
  currentPage: number;
}
export default function Pagination(props: PaginationProps) {
  const { totalPosts, postsPerPage, paginate, currentPage } = props;
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-wrap justify-center  gap-2 ">
      {pageNumbers.map((pgNumb) => (
        <div key={pgNumb}>
          <div
            onClick={() => paginate(pgNumb)}
            className={`my-2 w-12 h-12 md:w-12 md:h-12 p-2 pt-3 md:p-4 text-center   font-bold text-sm text-gray-500 rounded-full cursor-pointer  ${
              pgNumb == currentPage
                ? "bg-green-400 text-gray-50 hover:text-white "
                : "bg-gray-300  "
            }`}
          >
            {pgNumb}
          </div>
        </div>
      ))}
    </div>
  );
}
