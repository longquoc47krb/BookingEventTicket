import {
  ColumnDirective,
  ColumnsDirective,
  ContextMenu,
  ExcelExport,
  Filter,
  GridComponent,
  Inject,
  Page,
  Search,
  Sort,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { Radio, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFetchAllOrganizers } from "../api/services/organizationServices";
import { Header } from "../components";
import { accountGrid, contextMenuItems } from "../data/dummy";
const { Group } = Radio;
const Accounts = () => {
  const toolbarOptions = ["Search"];
  const { data: organizers, status } = useFetchAllOrganizers();
  const editing = { allowDeleting: true, allowEditing: true };
  const { t } = useTranslation();
  const [value, setValue] = useState("pending");
  const [accounts, setAccounts] = useState([]);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  useEffect(() => {
    if (status === "success") {
      switch (value) {
        case "all": {
          setAccounts(organizers);
          break;
        }
        case "pending": {
          // const pending = organizers.organization?.filter(
          //   (o) => o.status === "DISABLED"
          // );
          // setAccounts(pending);
          break;
        }
        case "accepted": {
          // const accepted = organizers.organization?.filter(
          //   (o) => o.status === "ACCEPTED"
          // );
          // setAccounts(accepted);
          break;
        }
        default: {
          setAccounts(organizers);
          break;
        }
      }
    }
  }, [value, status, organizers]);
  console.log({ accounts });
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl relative">
      <Header category={t("sider.management")} title={t("sider.account")} />
      {/* <div className="flex w-full justify-end">
        <button className="p-2 bg-primary rounded-md mb-2 text-white text-lg">
          {t("account.export-excel")}
        </button>
      </div> */}
      <div className="absolute top-[4.5rem] right-10">
        <Group onChange={onChange} value={value}>
          <Radio value="all">{t("account.all")}</Radio>
          <Radio value="accepted">{t("account.accepted-accounts")}</Radio>
          <Radio value="pending">{t("account.pending-accounts")}</Radio>
        </Group>
      </div>
      {status === "loading" ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <GridComponent
          dataSource={organizers}
          width="auto"
          allowPaging
          allowSorting
          allowExcelExport
          pageSettings={{ pageCount: 5 }}
          toolbar={toolbarOptions}
          editSettings={editing}
          contextMenuItems={contextMenuItems}
        >
          <ColumnsDirective>
            {accountGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject
            services={[
              Search,
              Page,
              Toolbar,
              Filter,
              Sort,
              ContextMenu,
              ExcelExport,
            ]}
          />
        </GridComponent>
      )}
    </div>
  );
};
export default Accounts;
