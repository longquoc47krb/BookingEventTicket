import React, { useRef, useEffect } from "react";
import Fuse from "fuse.js";
import { Input } from "antd";
import { BiSearchAlt } from "react-icons/bi";
import { useClickAway } from "react-use";
import { useDispatch, useSelector } from "react-redux";
import {
  setKeywordsArray,
  setTicketSearchList,
  searchTextSelector,
  setSearchText,
} from "../../redux/slices/generalSlice";
function SearchTicketBox({ data, placeholder }) {
  const searchText = useSelector(searchTextSelector);
  const keys = Array.from(new Set(data?.flatMap((obj) => Object.keys(obj))));
  console.log({ keys });
  const dispatch = useDispatch();
  const fuse = new Fuse(data, {
    keys: ["eventName"],
    isCaseSensitive: false,
    findAllMatches: false,
    includeMatches: false,
    includeScore: false,
    useExtendedSearch: false,
    ignoreLocation: true,
    minMatchCharLength: 3,
    shouldSort: true,
    threshold: 0.2,
    location: 0,
    distance: 100,
  });
  useEffect(() => {
    const results = data ? fuse.search(searchText) : [];
    dispatch(setTicketSearchList(results));
    const arraySplit = searchText.split(" ");
    dispatch(setKeywordsArray(arraySplit));
  }, [searchText]);
  return (
    <Input
      className="relative rounded w-[60vw] h-full py-[10px] px-4"
      prefix={<BiSearchAlt fontSize={20} className="cursor-pointer mr-3" />}
      value={searchText}
      placeholder={placeholder}
      onChange={({ currentTarget }) => {
        dispatch(setSearchText(currentTarget.value));
      }}
      style={{ padding: "0.5rem" }}
      allowClear
    />
  );
}

export default SearchTicketBox;
