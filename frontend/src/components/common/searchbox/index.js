/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Empty, Input } from "antd";
import Fuse from "fuse.js";
import PropTypes from "prop-types";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { BiSearchAlt } from "react-icons/bi";
import { GrMore } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useClickAway, useDebounce } from "react-use";
import { useFetchEvents } from "../../../api/services/eventServices";
import { setResults } from "../../../redux/slices/searchSlice";
import { debounce } from "../../../utils/utils";
const SearchBox = (props) => {
  const { value, data, placeholder } = props;
  const [filterValue, setFilterValue] = useState(value || "");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [expand, setExpand] = useState(true);
  const ref = useRef();
  useClickAway(ref, () => {
    setExpand(false);
  });
  const [, cancel] = useDebounce(
    () => {
      setDebouncedValue(filterValue);
      setExpand(true);
    },
    1000,
    [filterValue]
  );
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let fuse;

  fuse =
    data &&
    useMemo(
      () =>
        new Fuse(data, {
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
        }),
      [data]
    );
  const results = data && fuse.search(debouncedValue);
  // console.log({ results });
  useEffect(() => {
    dispatch(setResults(results));
  }, [dispatch]);
  return (
    <div className="SearchBox" ref={ref}>
      <Input
        className="relative p-2 rounded w-full"
        prefix={<BiSearchAlt fontSize={20} className="cursor-pointer mr-3" />}
        value={filterValue}
        placeholder={placeholder}
        onChange={({ currentTarget }) => {
          setFilterValue(currentTarget.value);
        }}
        allowClear
      />
      {debouncedValue && expand ? (
        <ul className="SearchBox_Results_List">
          {results && (
            <p className="p-2 text-black">
              {t("search.result", { val: results?.length })}
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
          {!results?.length ? (
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
          {results?.length > 3 ? (
            <li
              className="SearchBox_Results_List_Item flex gap-x-2 items-end"
              onClick={() => {
                navigate(`/events`);
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
  expand: PropTypes.bool,
  placeholder: PropTypes.string,
};
export default SearchBox;
