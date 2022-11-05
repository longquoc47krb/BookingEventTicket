/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Empty, Input } from "antd";
import Fuse from "fuse.js";
import { debounce } from "lodash";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiSearchAlt } from "react-icons/bi";
import { GrMore } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useClickAway, useDebounce } from "react-use";
import { setResult, setSearchResults } from "../../../redux/slices/searchSlice";
import { isEmpty } from "../../../utils/utils";
const SearchBox = (props) => {
  const { value, data, placeholder, isExpand } = props;
  const [filterValue, setFilterValue] = useState(value || "");
  const result = useSelector((state) => state.search.result);
  const [expand, setExpand] = useState(isExpand);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const ref = useRef();
  useClickAway(ref, () => {
    setExpand(false);
  });

  const fuse = new Fuse(data, {
    isCaseSensitive: false,
    findAllMatches: false,
    includeMatches: false,
    includeScore: false,
    useExtendedSearch: false,
    minMatchCharLength: 1,
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    keys: [
      "id",
      "name",
      "venue",
      "startingDate",
      "eventCategoryList.name",
      "province",
    ],
  });
  const results = data ? fuse.search(result) : [];
  useEffect(() => {
    dispatch(setSearchResults(results));
  }, [result]);
  if (!data) {
    return null;
  }
  console.log({ result, expand });
  console.log(">debouncedValue", result);
  return (
    <div className="SearchBox" ref={ref}>
      <Input
        className="relative rounded w-full h-full py-[10px] px-4"
        prefix={<BiSearchAlt fontSize={20} className="cursor-pointer mr-3" />}
        value={result}
        placeholder={placeholder}
        onChange={({ currentTarget }) => {
          debounce(dispatch(setResult(currentTarget.value)), 1500);
          navigate(`/events?search=${currentTarget.value}`);
        }}
        style={{ padding: "0.5rem" }}
        allowClear
      />
      {result && expand ? (
        <ul className="SearchBox_Results_List">
          {results && (
            <p className="p-2 text-black">
              {t("search.result", { val: results ? results.length : 0 })}
            </p>
          )}
          {results?.slice(0, 3).map((row) => {
            return (
              <div
                className="flex gap-x-2 SearchBox_Results_List_Item"
                onClick={() => {
                  navigate(`/event/${row.item.id}`);
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
                    {row.item.venue}
                  </span>
                </div>
              </div>
            );
          })}
          {isEmpty(results) ? (
            <li className="SearchBox_Results_List_Item px-2 py-0">
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 60,
                  width: "auto",
                  display: "flex",
                  justifyContent: "center",
                }}
                description={
                  <span className="text-xl ">{t("search.empty")}</span>
                }
              ></Empty>
            </li>
          ) : null}
          {results.length > 3 ? (
            <li
              className="SearchBox_Results_List_Item flex gap-x-2 items-end"
              onClick={() => {
                navigate(`/events?search=${result}`);
              }}
            >
              {t("search.view-all")}
              <GrMore />
            </li>
          ) : null}
        </ul>
      ) : null}
    </div>
  );
};
SearchBox.propTypes = {
  isExpand: PropTypes.bool,
  placeholder: PropTypes.string,
};
SearchBox.defaultProps = {
  isExpand: true,
};
export default SearchBox;
