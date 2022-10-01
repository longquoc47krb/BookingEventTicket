/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mb-5">
      <ul className="w-full flex justify-center gap-x-2">
        {pageNumbers.map((number) => (
          <li
            onClick={() => paginate(number)}
            key={number}
            className="px-2 py-1 border-solid border-2 border-gray-400 rounded-sm hover:bg-blue-500 hover:text-white"
          >
            <a>{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
