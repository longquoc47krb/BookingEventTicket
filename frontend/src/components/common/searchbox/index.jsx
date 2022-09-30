import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const Search = ({ data, searchKey }) => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const fuseOptions = {
    keys: ["name", "address", "startingTime"],
  };

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);
  console.log("items", items);

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.

    if (string.length > 3 && (!query || !string.includes(query))) {
      setQuery(string);
      return;
    }
  };

  const handleOnSelect = (item) => {
    // the item selected
    setQuery(item.name);
    navigate(`/event/${item.name}`);
  };
  const formatResult = (item) => {
    return (
      <div className="flex gap-x-2">
        <img src={item.background} className="w-auto h-[50px]" alt="Event" />
        <div className="flex flex-col">
          <span
            style={{ display: "block", textAlign: "left", fontWeight: 700 }}
          >
            {item.name}
          </span>
          <span style={{ display: "block", textAlign: "left" }}>
            {item.address}
          </span>
        </div>
      </div>
    );
  };
  return (
    <div style={{ width: "50%", zIndex: 3 }}>
      <ReactSearchAutocomplete
        autoFocus
        items={items}
        onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        inputSearchString={query}
        placeholder="Tìm kiếm sự kiện theo tên, địa chỉ,..."
        maxResults={5}
        inputDebounce={200}
        fuseOptions={fuseOptions}
        resultStringKeyName={searchKey}
        showNoResultsText="Không có kết quả"
        formatResult={formatResult}
      />
    </div>
  );
};

export default Search;
