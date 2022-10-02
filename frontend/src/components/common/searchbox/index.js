/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Input } from "antd";
import Fuse from "fuse.js";
import React, { useEffect, useMemo, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { GrMore } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { resultSelector, setResults } from "../../../redux/slices/searchSlice";
const SearchBox = (props) => {
  const { value, data, placeholder, expand, ref } = props;
  const [filterValue, setFilterValue] = useState(value || "");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fuse = useMemo(
    () =>
      new Fuse(data, {
        isCaseSensitive: false,
        findAllMatches: false,
        includeMatches: false,
        includeScore: false,
        useExtendedSearch: false,
        minMatchCharLength: 1,
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        keys: ["name", "address", "startingTime", "eventCategoryList.name"],
      }),
    [data]
  );

  const results = fuse.search(filterValue);
  const resultState = useSelector(resultSelector);
  useEffect(() => {
    dispatch(setResults(results));
  }, [dispatch]);
  return (
    <div className="SearchBox" ref={ref}>
      <Input
        className="relative p-2 rounded"
        prefix={<BiSearchAlt fontSize={20} className="cursor-pointer mr-3" />}
        value={filterValue}
        placeholder={placeholder}
        onChange={(e) => setFilterValue(e.target.value)}
      />
      {filterValue && expand ? (
        <ul className="SearchBox_Results_List">
          {results && (
            <p className="p-2">
              Kết quả tìm kiếm: <strong>{results.length}</strong> kết quả
            </p>
          )}
          {results.slice(0, 3).map((row) => {
            return (
              <div
                className="flex gap-x-2 SearchBox_Results_List_Item"
                onClick={() => {
                  navigate(`/event/${row.item.name}`);
                }}
              >
                <img
                  src={row.item.background}
                  className="w-auto h-[50px]"
                  alt="Event"
                />
                <div className="flex flex-col">
                  <span
                    style={{
                      display: "block",
                      textAlign: "left",
                      fontWeight: 700,
                    }}
                  >
                    {row.item.name}
                  </span>
                  <span style={{ display: "block", textAlign: "left" }}>
                    {row.item.address}
                  </span>
                </div>
              </div>
            );
          })}
          {!results.length ? (
            <li className="SearchBox_Results_List_Item px-2 py-0">
              Không tìm thấy
            </li>
          ) : null}
          {results.length > 3 ? (
            <li
              className="SearchBox_Results_List_Item flex gap-x-2 items-end"
              onClick={() => {
                navigate(`/events`);
              }}
            >
              Xem tất cả <GrMore />
            </li>
          ) : null}
        </ul>
      ) : null}
    </div>
  );
};
SearchBox.propTypes = {
  expand: PropTypes.bool,
};
SearchBox.defaultProps = {
  expand: true,
};
export default SearchBox;