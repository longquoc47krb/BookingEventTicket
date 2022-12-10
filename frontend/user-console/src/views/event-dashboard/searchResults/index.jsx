import { Pagination } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiSearchAlt2 } from "react-icons/bi";
import { useSelector } from "react-redux";
import EmptyData from "../../../components/empty";
import Event from "../../../components/event";
import { resultSelector } from "../../../redux/slices/searchSlice";

function SearchResults() {
  const searchResults = useSelector(resultSelector);
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  // Change page
  const onChange = (page) => {
    setCurrentPage(page - 1);
  };
  // if filter change, set current page equal 0 ( page 1)
  const firstIndex = currentPage * 6;
  const lastIndex = currentPage * 6 + 6;
  return (
    <div className="event-container">
      <span className="text-black text-2xl font-semibold flex items-center gap-x-1 mb-1 border-b-2 border-[#1f3e82] w-full">
        <BiSearchAlt2 />
        {t("search.result", { val: searchResults ? searchResults.length : 0 })}
      </span>
      <div className="event-container-grid mt-3">
        {searchResults ? (
          searchResults
            .slice(firstIndex, lastIndex)
            .map((event, index) => <Event event={event.item} key={index} />)
        ) : (
          <EmptyData />
        )}
      </div>
      <div className="event-pagination">
        {!searchResults ? null : searchResults.length > 0 ? (
          <Pagination
            current={currentPage + 1}
            onChange={onChange}
            total={searchResults.length}
            pageSize={6}
            defaultCurrent={1}
          />
        ) : null}
      </div>
    </div>
  );
}

export default SearchResults;
