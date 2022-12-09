// import for table
import { Radio, Spin, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
// end import for table
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useFindAllAccount } from "../api/services/adminServices";
import { useFetchEventsByOrgID } from "../api/services/organizationServices";
import { Header } from "../components";
import BreadCrumbs from "../components/BreadCrumb";
import OrdersByEventModal from "../components/OrdersByEventModal";
import Table from "../components/Table";
import { orderColumns, orderByAccountColumns } from "../data/dummy";
import { userInfoSelector } from "../redux/slices/accountSlice";
import { eventIdSelector } from "../redux/slices/eventSlice";
import { ROLE } from "../utils/constants";
import { isNotEmpty } from "../utils/utils";
import { has } from "lodash";

const Orders = () => {
  const user = useSelector(userInfoSelector);
  const [value, setValue] = useState("by-event");
  const openModal = useSelector((state) => state.event.openModal);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const { data: events, status } = useFetchEventsByOrgID(user.id);
  const { data: accounts, status: accountStatus } = useFindAllAccount();
  const { t } = useTranslation();
  const orderByEventData = events?.map((item) => ({
    id: item.id,
    background: item.background,
    name: item.name,
    ticketTotal: item.ticketTotal,
    ticketRemaining: item.ticketRemaining,
    date: item.startingDate,
    status: item.status,
  }));
  const orderByAccountData = accounts
    ?.filter((a) => a.role === ROLE.Customer)
    .map((item) => ({
      key: item.id,
      id: item.id,
      name: item.name,
      email: item.email,
      loginTime: item.loginTime,
    }));
  const [title, setTitle] = useState("");
  // for table
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const eventId = useSelector(eventIdSelector);
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
            icon={<SearchOutlined />}
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
      <SearchOutlined
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
  const nameColumn = orderColumns.find((e) => e.dataIndex === "name");
  Object.assign(nameColumn, getColumnSearchProps("name"));

  useEffect(() => {
    if (isNotEmpty(events) && eventId) {
      const obj = events.find((e) => e.id === eventId);
      const titleTemp = has(obj, "name") ? obj.name : "";
      setTitle(titleTemp);
    }
  }, [events, eventId]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl relative">
      {/* <BreadCrumbs
        breadcrumbs={breadcrumbs}
        className="absolute top-10 right-10"
      /> */}
      <Header category={t("sider.management")} title={t("sider.order")} />
      <div className="absolute top-[4.5rem] right-10">
        <Radio.Group onChange={onChange} value={value} defaultValue="all">
          <Radio value="by-event">{t("order.by-event")}</Radio>
          <Radio value="by-account">{t("order.by-account")}</Radio>
        </Radio.Group>
      </div>
      {status === "loading" ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spin />
        </div>
      ) : value === "by-event" ? (
        <Table columns={orderColumns} dataSource={orderByEventData} />
      ) : (
        <Table
          columns={orderByAccountColumns}
          dataSource={orderByAccountData}
        />
      )}
      <OrdersByEventModal
        open={openModal}
        title={t("orders-of-event", { val: title ?? "" })}
      />
    </div>
  );
};
export default Orders;
