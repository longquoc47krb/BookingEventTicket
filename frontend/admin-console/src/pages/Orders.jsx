// import for table
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
// end import for table
import { has } from "lodash";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useFetchEventsByOrgID } from "../api/services/organizationServices";
import { Header } from "../components";
import OrdersByEventModal from "../components/OrdersByEventModal";
import Table from "../components/Table";
import { orderColumns } from "../data/dummy";
import { userInfoSelector } from "../redux/slices/accountSlice";
import { eventIdSelector } from "../redux/slices/eventSlice";
import { isNotEmpty } from "../utils/utils";

const Orders = () => {
  const user = useSelector(userInfoSelector);
  const openModal = useSelector((state) => state.event.openModal);
  const { data: events, status } = useFetchEventsByOrgID(user.id);
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

      {status === "loading" ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <Table columns={orderColumns} dataSource={orderByEventData} />
      )}
      <OrdersByEventModal
        open={openModal}
        title={t("orders-of-event", { val: title ?? "" })}
      />
    </div>
  );
};
export default Orders;
