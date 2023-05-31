/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, Radio, Space, Spin } from "antd";
import { filter } from "lodash";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useFindAllAccount,
  useFindAllCustomer,
} from "../api/services/adminServices";
import { useFetchAllOrganizers } from "../api/services/organizationServices";
import { Header } from "../components";
import Table from "../components/Table";
import { accountColumns, pendingAccountsColumns } from "../data/dummy";
import { AccountStatus } from "../utils/constants";
import ExportExcelButton from "../components/common/excel-button";
import { getCurrentDatetime } from "../utils/utils";
import { BsSearchHeart } from "react-icons/bs";
import Highlighter from "react-highlight-words";

const { Group } = Radio;
const Accounts = () => {
  const toolbarOptions = ["Search"];
  const { data: organizers, status } = useFetchAllOrganizers();
  const { data: accounts, status: accountStatus } = useFindAllAccount();
  const { data: customers, status: customerStatus } = useFindAllCustomer();
  const { t } = useTranslation();
  const [value, setValue] = useState("all");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const accountData = accounts?.map((item) => ({
    key: item.id,
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    loginTime: item.loginTime,
    role: item.role,
  }));
  const pendingAccountData = filter(organizers, {
    organization: { status: AccountStatus.disabled },
  }).map((item) => ({
    name: item.name,
    email: item.organization.email,
    province: item.organization.province,
    status: item.organization.status,
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
          ></Button>
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
  const nameColumn = accountColumns.find((e) => e.dataIndex === "name");
  Object.assign(nameColumn, getColumnSearchProps("name"));
  // export excel

  const columns = [
    { header: "ID", key: "id", width: 10 },
    { header: "Name", key: "name", width: 32 },
    { header: "Email", key: "email", width: 32 },
    { header: "Phone", key: "phone", width: 20 },
    { header: "Role", key: "role", width: 32 },
  ];
  const data = accountData?.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    role: item.role,
  }));
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl relative">
      <Header category={t("sider.management")} title={t("sider.account")} />
      <ExportExcelButton
        data={data}
        columns={columns}
        filename={`Account-${getCurrentDatetime()}`}
      />
      <div className="absolute top-[4.5rem] right-10">
        <Group onChange={onChange} value={value} defaultValue="all">
          <Radio value="all">{t("account.all")}</Radio>
          <Radio value="pending">{t("account.pending-accounts")}</Radio>
        </Group>
      </div>
      {status === "loading" ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <Table
          columns={value === "all" ? accountColumns : pendingAccountsColumns}
          dataSource={value === "all" ? accountData : pendingAccountData}
        />
      )}
    </div>
  );
};
export default Accounts;
