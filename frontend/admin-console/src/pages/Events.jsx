import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFetchEventsByOrgID } from "../api/services/organizationServices";
import { Header } from "../components";
// import for table
import { BsSearchHeart } from "react-icons/bs";
import { Spin, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { useRef } from "react";
import { useState } from "react";
// end import for table
import Table from "../components/Table";
import { eventColumns } from "../data/dummy";
import { userInfoSelector } from "../redux/slices/accountSlice";
import { getCurrentDatetime, reverseArray } from "../utils/utils";
import ExportExcelButton from "../components/common/excel-button";
const Events = () => {
  const user = useSelector(userInfoSelector);
  const { data: events, status } = useFetchEventsByOrgID(user.id);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const eventData = events?.map((item) => ({
    id: item.id,
    background: item.background,
    name: item.name,
    categories: item.eventCategoryList,
    date: item.startingDate,
    status: item.status,
  }));

  // for table
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<BsSearchHeart />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <BsSearchHeart
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  // columns for Excel
  const columns = [
    { header: "ID", key: "id", width: 10 },
    { header: "Name", key: "name", width: 32 },
    { header: "Categories", key: "categories", width: 32, outlineLevel: 1 },
    { header: "Date", key: "date", width: 15 },
    { header: "Status", key: "status", width: 10 },
  ];
  const data = eventData?.map((item) => ({
    id: item.id,
    background: item.background,
    name: item.name,
    categories: item.categories?.map((item) => t(item.name)),
    date: item.date,
    status:
      item.status === "event.completed"
        ? t("event.status.completed")
        : t("event.status.available"),
  }));
  console.log({ data });
  // end for table
  const nameColumn = eventColumns.find((e) => e.dataIndex === "name");
  Object.assign(nameColumn, getColumnSearchProps("name"));
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 card">
      <Header category={t("sider.management")} title={t("sider.event")} />
      <div className="flex w-full justify-end gap-x-4">
        <button
          className="p-2 bg-primary rounded-md mb-2 text-white text-lg"
          onClick={() => navigate("/event/create")}
        >
          {t("event.create")}
        </button>
        <ExportExcelButton
          data={data}
          columns={columns}
          filename={`Event-${getCurrentDatetime()}`}
        />
      </div>
      {status === "loading" ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <Table columns={eventColumns} dataSource={reverseArray(eventData)} />
      )}
    </div>
  );
};
export default Events;
