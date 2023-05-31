import { Modal, Radio, Spin } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  useFetchOrdersByEventId,
  useFetchOrdersWithUniqueAccount,
} from "../api/services/orderServices";
import {
  orderByEventColumns,
  orderByEventWithUniqueAccountColumns,
  ticketColumns,
} from "../data/dummy";
import { userInfoSelector } from "../redux/slices/accountSlice";
import {
  eventIdSelector,
  setOpenModal,
  setOpenTicketModal,
  ticketsInOrderSelector,
} from "../redux/slices/eventSlice";
import Table from "./Table";
import ExportExcelButton from "./common/excel-button";
import {
  addFileExtension,
  removeSpecialSymbolsExceptDot,
} from "../utils/utils";
function OrdersByEventModal(props) {
  const { title, open } = props;
  const dispatch = useDispatch();
  const eventId = useSelector(eventIdSelector);
  const user = useSelector(userInfoSelector);
  const [value, setValue] = useState("by-event");
  const ticketsInOrder = useSelector(ticketsInOrderSelector);
  const openTicketModal = useSelector((state) => state.event.openTicketModal);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const { t } = useTranslation();
  const { data, status } = useFetchOrdersByEventId(eventId, user.id);
  const { data: data2, status: status2 } = useFetchOrdersWithUniqueAccount(
    eventId,
    user.id
  );
  // columns for Excel
  const columns = [
    { header: "ID", key: "id", width: 10 },
    { header: "Email", key: "email", width: 32 },
    { header: "Total price", key: "totalPrice", width: 32, outlineLevel: 1 },
    { header: "Total quantity", key: "totalQuantity", width: 32 },
    { header: "Date", key: "createdDate", width: 10, width: 64 },
  ];
  return (
    <div>
      <Modal
        title={
          <p className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[20vw]">
            {t("orders-of-event", { val: title ?? "" })}
          </p>
        }
        visible={open}
        width={"100%"}
        closable={false}
        onCancel={() => dispatch(setOpenModal(false))}
        onOk={() => dispatch(setOpenModal(false))}
      >
        <div className="absolute top-4 right-4">
          <Radio.Group onChange={onChange} value={value} defaultValue="all">
            <Radio value="by-event">{t("order.by-event")}</Radio>
            <Radio value="by-account">{t("order.by-account")}</Radio>
          </Radio.Group>
        </div>
        {status === "loading" || status2 === "loading" ? (
          <div className="w-full h-full flex items-center justify-center">
            <Spin />
          </div>
        ) : value === "by-event" ? (
          <>
            <ExportExcelButton
              data={data}
              columns={columns}
              filename={addFileExtension(removeSpecialSymbolsExceptDot(title))}
            />
            <Table
              dataSource={data ? data : []}
              columns={orderByEventColumns}
            />
          </>
        ) : (
          <Table
            dataSource={data2 ? data2 : []}
            columns={orderByEventWithUniqueAccountColumns}
          />
        )}
      </Modal>
      <Modal
        visible={openTicketModal}
        width={"80vw"}
        onCancel={() => dispatch(setOpenTicketModal(false))}
        onOk={() => dispatch(setOpenTicketModal(false))}
      >
        <Table dataSource={ticketsInOrder} columns={ticketColumns} />
      </Modal>
    </div>
  );
}

export default OrdersByEventModal;
