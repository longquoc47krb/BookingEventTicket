import { Modal, Radio, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  findOrderWithUniqueAccount,
  findOrdersByEventId,
} from "../api/services/orderServices";
import {
  orderByEventColumns,
  orderByEventWithUniqueAccountColumns,
  ticketColumns,
} from "../data/dummy";
import { userInfoSelector } from "../redux/slices/accountSlice";
import {
  eventIdSelector,
  setOpenOrderModal,
  setOpenTicketModal,
  ticketsInOrderSelector,
  orderEmailSelector,
  setOpenTicketByUniqueAccountModal,
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
  const orderEmail = useSelector(orderEmailSelector);
  const ticketsInOrder = useSelector(ticketsInOrderSelector);
  const openTicketModal = useSelector((state) => state.event.openTicketModal);
  const openTicketByUniqueAccountModal = useSelector(
    (state) => state.event.openTicketByUniqueAccountModal
  );
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const { t } = useTranslation();
  useEffect(() => {
    async function fetchOrderByEvent() {
      setLoading(true);
      const response = await findOrdersByEventId(eventId, user.id);
      setData(response);
      setLoading(false);
    }
    fetchOrderByEvent();
  }, [eventId]);
  useEffect(() => {
    async function fetchOrdersWithUniqueAccount() {
      setLoading(true);
      const response = await findOrderWithUniqueAccount(eventId, user.id);
      setData2(response);
      setLoading(false);
    }
    fetchOrdersWithUniqueAccount();
  }, [eventId]);
  const ticketsByUniqueAccount = data?.filter((o) => o.email === orderEmail);
  // columns for Excel
  console.log({ data, data2, ticketsByUniqueAccount });
  const columns = [
    { header: "ID", key: "id", width: 10 },
    { header: "Email", key: "email", width: 32 },
    { header: "Total price", key: "totalPrice", width: 32, outlineLevel: 1 },
    { header: "Total quantity", key: "totalQuantity", width: 32 },
    { header: "Date", key: "createdDate", width: 64 },
  ];
  return (
    <div>
      <Modal
        title={
          <p
            className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[40vw]"
            dangerouslySetInnerHTML={{
              __html: t("orders-of-event", { val: title ?? "" }),
            }}
          />
        }
        visible={open}
        width={"100%"}
        closable={false}
        onCancel={() => dispatch(setOpenOrderModal(false))}
        onOk={() => dispatch(setOpenOrderModal(false))}
      >
        <div className="absolute top-4 right-4">
          <Radio.Group onChange={onChange} value={value} defaultValue="all">
            <Radio value="by-event">{t("order.by-event")}</Radio>
            <Radio value="by-account">{t("order.by-account")}</Radio>
          </Radio.Group>
        </div>
        {loading && (
          <div className="w-full h-full flex items-center justify-center">
            <Spin />
          </div>
        )}
        {!loading && value === "by-event" && (
          <>
            <ExportExcelButton
              data={data}
              columns={columns}
              filename={addFileExtension(removeSpecialSymbolsExceptDot(title))}
            />
            <Table dataSource={data} columns={orderByEventColumns} />
          </>
        )}
        {!loading && value === "by-account" && (
          <>
            <ExportExcelButton
              data={data}
              columns={columns}
              filename={addFileExtension(removeSpecialSymbolsExceptDot(title))}
            />
            <Table
              dataSource={data2}
              columns={orderByEventWithUniqueAccountColumns}
            />
          </>
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
      <Modal
        visible={openTicketByUniqueAccountModal}
        width={"80vw"}
        onCancel={() => dispatch(setOpenTicketByUniqueAccountModal(false))}
        onOk={() => dispatch(setOpenTicketByUniqueAccountModal(false))}
      >
        <Table
          dataSource={ticketsByUniqueAccount}
          columns={orderByEventColumns}
        />
      </Modal>
    </div>
  );
}

export default OrdersByEventModal;
