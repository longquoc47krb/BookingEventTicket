/* eslint-disable react-hooks/exhaustive-deps */
import { ColumnDirective, ColumnsDirective } from "@syncfusion/ej2-react-grids";
import { Radio, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useFindAllAccount,
  useFindAllCustomer,
} from "../api/services/adminServices";
import { filter } from "lodash";
import { useFetchAllOrganizers } from "../api/services/organizationServices";
import { Header } from "../components";
import Table from "../components/Table";
import { AccountStatus } from "../utils/constants";
import { accountColumns, pendingAccountsColumns, customerGrid, organizationGrid } from "../data/dummy";
const { Group } = Radio;
const Accounts = () => {
  const toolbarOptions = ["Search"];
  const { data: organizers, status } = useFetchAllOrganizers();
  const { data: accounts, status: accountStatus } = useFindAllAccount();
  const { data: customers, status: customerStatus } = useFindAllCustomer();
  const [dataSource, setDataSource] = useState([]);
  const editing = { allowDeleting: true, allowEditing: true };
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
    role: item.role,
  }));
  const pendingAccountData = filter(organizers, {organization
    :{status: AccountStatus.disabled}}).map((item) => ({
    name: item.name,
    email: item.organization.email,
    province: item.organization.province,
    status: item.organization.status
    
  }));

  useEffect(() => {
    switch (value) {
      case "all": {
        setDataSource(accounts);
        break;
      }
      case "customer": {
        setDataSource(customers);
        break;
      }
      case "organization": {
        setDataSource(organizers);
        break;
      }
      default: {
        setDataSource(accounts);
        break;
      }
    }
  }, [value]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl relative">
      <Header category={t("sider.management")} title={t("sider.account")} />
      {/* <div className="flex w-full justify-end">
        <button className="p-2 bg-primary rounded-md mb-2 text-white text-lg">
          {t("account.export-excel")}
        </button>
      </div> */}
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
          columns={value === "all" ? accountColumns : pendingAccountsColumns }
          dataSource={value === "all" ? accountData : pendingAccountData}
        />
      )}
    </div>
  );
};
export default Accounts;
