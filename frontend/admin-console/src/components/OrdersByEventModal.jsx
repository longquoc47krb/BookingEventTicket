import { Modal, Spin } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchOrdersByEventId } from "../api/services/orderServices";
import { orderByEventColumns } from "../data/dummy";
import { userInfoSelector } from "../redux/slices/accountSlice";
import { eventIdSelector, setOpenModal } from "../redux/slices/eventSlice";
import Table from "./Table";
function OrdersByEventModal(props) {
  const { title, open } = props;
  const dispatch = useDispatch();
  const eventId = useSelector(eventIdSelector);
  const user = useSelector(userInfoSelector);
  const { data, status } = useFetchOrdersByEventId(eventId, user.id);
  return (
    <Modal
      title={title}
      centered
      visible={open}
      width={"100%"}
      onCancel={() => dispatch(setOpenModal(false))}
    >
      {status === "loading" ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <Table dataSource={data ? data : []} columns={orderByEventColumns} />
      )}
    </Modal>
  );
}

export default OrdersByEventModal;
