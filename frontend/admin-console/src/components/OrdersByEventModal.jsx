import React from "react";
import { Col, Form, Modal, Radio, Row, Typography, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { eventIdSelector, setOpenModal } from "../redux/slices/eventSlice";
import { useFetchOrdersByEventId } from "../api/services/orderServices";
import { userInfoSelector } from "../redux/slices/accountSlice";
import Table from "./Table";
import { orderByEventColumns } from "../data/dummy";
function OrdersByEventModal(props) {
  const { title, open } = props;
  const dispatch = useDispatch();
  const eventId = useSelector(eventIdSelector);
  const user = useSelector(userInfoSelector);
  console.log({ eventId, user });
  const { data, status } = useFetchOrdersByEventId(eventId, user.id);
  console.log({ data });
  return (
    <Modal
      title={title}
      centered
      visible={open}
      onCancel={() => dispatch(setOpenModal(false))}
      width={"100%"}
    >
      {
        status === "loading" ?  <div className="w-full h-full flex items-center justify-center">
        <Spin />
      </div> : <Table dataSource={data ? data : []} columns={orderByEventColumns} />
      }      
    </Modal>
  );
}

export default OrdersByEventModal;
