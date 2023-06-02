import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useGetPaymentListByOrganizerID } from "../api/services/organizationServices";
import { Header } from "../components";
// import for table
import { Button, Input, Space, Spin } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { BsSearchHeart } from "react-icons/bs";
// end import for table
import Table from "../components/Table";
import { paymentColumns } from "../data/dummy";
import { userInfoSelector } from "../redux/slices/accountSlice";
import { sortBy } from "lodash";
const Payments = () => {
  const user = useSelector(userInfoSelector);
  const { data: payments, status } = useGetPaymentListByOrganizerID(user.id);
  const { t } = useTranslation();
  console.log({ payments });
  const sortedPayments = sortBy(payments, (payment) => {
    if (payment.status === "INPROGRESS") {
      return 1;
    } else if (payment.status === "COMPLETED") {
      return 2;
    }
  });
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
  // end for table
  // const nameColumn = paymentColumns.find((e) => e.dataIndex === "name");
  // Object.assign(nameColumn, getColumnSearchProps("name"));
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 card">
      <Header category={t("sider.management")} title={t("sider.payment")} />
      {status === "loading" ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <Table columns={paymentColumns} dataSource={sortedPayments} />
      )}
    </div>
  );
};
export default Payments;
