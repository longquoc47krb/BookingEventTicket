/* eslint-disable jsx-a11y/alt-text */
import { t } from "i18next";
import React from "react";
import {
  AiOutlineCalendar,
  AiOutlinePicture,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiBookBookmark, BiCategory } from "react-icons/bi";
import { BsCheckLg, BsFillEyeFill, BsPeopleFill, BsXLg } from "react-icons/bs";
import { FaMusic, FaTheaterMasks, FaTrashAlt } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { IoTicketOutline } from "react-icons/io5";
import {
  MdOutlineAccountCircle,
  MdOutlineNightlife,
  MdOutlineTravelExplore,
  MdSportsSoccer,
} from "react-icons/md";
import { RiEditFill, RiSuitcaseFill } from "react-icons/ri";
import { TbWorld } from "react-icons/tb";
import eventServices from "../api/services/eventServices";
import organizationServices from "../api/services/organizationServices";
import {
  AlertErrorPopup,
  AlertPopup,
  AlertQuestion,
} from "../components/Alert";
import {
  setEventId,
  setOpenModal,
  setOpenTicketModal,
  setTickets,
} from "../redux/slices/eventSlice";
import { store } from "../redux/store";
import { AccountStatus, ROLE } from "../utils/constants";
import { convertMongodbTimeToString, formatter } from "../utils/utils";
const { approveOrganizer, refuseOrganizer } = organizationServices;
const { deleteEvent } = eventServices;
export const orderByEventColumns = [
  {
    title: "ID",
    dataIndex: "id",
    width: 250,
  },
  {
    title: "Email",
    dataIndex: "email",
    onFilter: (value, record) => record.email.indexOf(value) === 0,
    sorter: (a, b) => a.email.length - b.email.length,
    sortDirections: ["descend"],
  },
  {
    title: t("event.totalPrice"),
    dataIndex: "totalPrice",
    onFilter: (value, record) => record.totalPrice.indexOf(value) === 0,
    sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
    sortDirections: ["descend"],
    render: (text, record) => (
      <span>{formatter(record.currency).format(record.totalPrice)}</span>
    ),
    width: 200,
  },
  {
    title: t("event.totalQuantity"),
    dataIndex: "totalQuantity",
    onFilter: (value, record) => record.totalQuantity.indexOf(value) === 0,
    sorter: (a, b) => a.totalQuantity.length - b.totalQuantity.length,
    sortDirections: ["descend"],
    width: 200,
  },
  {
    title: t("event.createDate"),
    dataIndex: "createdDate",
    onFilter: (value, record) => record.createdDate.indexOf(value) === 0,
    sorter: (a, b) => a.createdDate.length - b.createdDate.length,
    sortDirections: ["descend"],
    render: (date) => <span>{convertMongodbTimeToString(date)}</span>,
  },
  {
    title: t("event.modify"),
    key: "action",
    render: (_, record) => (
      <div
        className="text-[#1f3e82] font-medium flex items-center gap-x-2 cursor-pointer"
        onClick={() => {
          store.dispatch(setTickets(record.customerTicketList));
          store.dispatch(setOpenTicketModal(true));
        }}
      >
        <span>{t("view-detail")}</span> <BsFillEyeFill />{" "}
      </div>
    ),
    width: 200,
  },
];
export const orderByEventWithUniqueAccountColumns = [
  {
    title: "Email",
    dataIndex: "email",
    onFilter: (value, record) => record.email.indexOf(value) === 0,
    sorter: (a, b) => a.email.length - b.email.length,
    sortDirections: ["descend"],
  },
  {
    title: t("event.totalPrice"),
    dataIndex: "usdrevenue",
    onFilter: (value, record) => record.usdrevenue.indexOf(value) === 0,
    sorter: (a, b) => a.usdrevenue.length - b.usdrevenue.length,
    sortDirections: ["descend"],
    render: (price) => <span>{formatter("USD").format(price)}</span>,
    width: 200,
  },
  {
    title: t("event.totalQuantity"),
    dataIndex: "totalTicket",
    onFilter: (value, record) => record.totalTicket.indexOf(value) === 0,
    sorter: (a, b) => a.totalTicket.length - b.totalTicket.length,
    sortDirections: ["descend"],
    width: 200,
  },
  {
    title: t("event.modify"),
    key: "action",
    render: (_, record) => (
      <div
        className="text-[#1f3e82] font-medium flex items-center gap-x-2 cursor-pointer"
        // onClick={() => {
        //   store.dispatch(setEventId(record.id));
        //   store.dispatch(setOpenModal(true));
        // }}
      >
        <span>{t("view-detail")}</span> <BsFillEyeFill />{" "}
      </div>
    ),
    width: 200,
  },
];
export const ticketColumns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: t("ticket.type"),
    dataIndex: "ticketName",
  },
  {
    title: t("ticket.price"),
    dataIndex: ["price", "currency"],
    render: (text, record) => (
      <span>{formatter(record.currency).format(record.price)}</span>
    ),
  },
  {
    title: t("ticket.totalQuantity"),
    dataIndex: "quantity",
  },
  {
    title: t("ticket.totalRemaining"),
    dataIndex: "quantityRemaining",
  },
  {
    title: t("ticket.status"),
    dataIndex: "status",
    filters: [
      {
        text: t("ticket.available"),
        value: "ticket.available",
      },
      {
        text: t("ticket.sold-out"),
        value: "ticket.sold-out",
      },
      {
        text: t("ticket.best-seller"),
        value: "ticket.best-seller",
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    render: (status) =>
      status === "ticket.available" ? (
        <span className="p-2 border-2 rounded-md text-xs bg-green-500 text-white font-medium mr-2">
          {t("ticket.available")}
        </span>
      ) : status === "ticket.sold-out" ? (
        <span className="p-2 bg-yellow-500 text-xs text-white rounded-md font-medium mr-2">
          {t("ticket.sold-out")}
        </span>
      ) : (
        <span className="p-2 rounded-md bg-red-500 text-xs  text-white font-medium mr-2">
          {t("ticket.best-seller")}
        </span>
      ),
  },
];
export const eventColumns = [
  {
    title: t("event.background"),
    dataIndex: "background",
    render: (background) => (
      <img src={background} className="h-[2rem] w-auto" />
    ),
  },
  {
    title: t("event.name"),
    dataIndex: "name",
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: t("event.category"),
    dataIndex: "categories",
    render: (categories) =>
      categories.map((item) => (
        <span className="p-2 bg-gray-100 border-2 text-xs rounded-md border-gray-500 text-gray-500 font-medium mr-2">
          {t(item.name)}
        </span>
      )),
    width: 250,
  },
  {
    title: t("event.status.title"),
    dataIndex: "status",
    width: 150,
    filters: [
      {
        text: t("event.status.available"),
        value: "event.available",
      },
      {
        text: t("event.status.completed"),
        value: "event.completed",
      },
      {
        text: t("event.status.soldout"),
        value: "event.sold-out",
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    render: (status) =>
      status === "event.available" ? (
        <span className="p-2 border-2 rounded-md text-xs bg-green-500 text-white font-medium mr-2">
          {t("event.status.available")}
        </span>
      ) : status === "event.completed" ? (
        <span className="p-2 bg-yellow-500 text-xs text-white rounded-md font-medium mr-2">
          {t("event.status.completed")}
        </span>
      ) : (
        <span className="p-2 rounded-md bg-red-500 text-xs  text-white font-medium mr-2">
          {t("event.status.soldout")}
        </span>
      ),
  },
  {
    title: t("event.modify"),
    key: "action",
    render: (_, record) => (
      <div className="flex items-center gap-2">
        <RiEditFill
          className="text-primary text-xl cursor-pointer"
          onClick={() => window.location.replace(`/event/update/${record.id}`)}
        />
        <FaTrashAlt
          className="text-primary text-xl cursor-pointer"
          onClick={() => {
            AlertQuestion({
              title: t("popup.event.delete"),
              callback: async (result) => {
                if (result.isConfirmed) {
                  const response = await deleteEvent(
                    record.id,
                    store.getState().account.userInfo.id
                  );
                  if (response.status === 200) {
                    AlertPopup({
                      title: t("popup.event.delete-success"),
                      timer: 5000,
                    });
                  }
                }
              },
            });
          }}
        />
      </div>
    ),
  },
];
export const eventByCategoryColumns = [
  {
    title: t("event.background"),
    dataIndex: "background",
    render: (background) => (
      <img src={background} className="h-[2rem] w-auto" />
    ),
  },
  {
    title: t("event.name"),
    dataIndex: "name",
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: t("event.category"),
    dataIndex: "categories",
    render: (categories) =>
      categories.map((item) => (
        <span className="p-2 bg-gray-100 border-2 text-xs rounded-md border-gray-500 text-gray-500 font-medium mr-2">
          {t(item.name)}
        </span>
      )),
    width: 250,
  },
  {
    title: t("event.status.title"),
    dataIndex: "status",
    width: 150,
    filters: [
      {
        text: t("event.status.available"),
        value: "event.available",
      },
      {
        text: t("event.status.completed"),
        value: "event.completed",
      },
      {
        text: t("event.status.soldout"),
        value: "event.sold-out",
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    render: (status) =>
      status === "event.available" ? (
        <span className="p-2 border-2 rounded-md text-xs bg-green-500 text-white font-medium mr-2">
          {t("event.status.available")}
        </span>
      ) : status === "event.completed" ? (
        <span className="p-2 bg-yellow-500 text-xs text-white rounded-md font-medium mr-2">
          {t("event.status.completed")}
        </span>
      ) : (
        <span className="p-2 rounded-md bg-red-500 text-xs  text-white font-medium mr-2">
          {t("event.status.soldout")}
        </span>
      ),
  },
];
export const paymentColumns = [
  {
    title: t("event.name"),
    dataIndex: "name",
  },
  {
    title: t("payment.vndbalanceLock"),
    dataIndex: "vndbalanceLock",
    render: (vndbalanceLock) => (
      <span>{formatter("VND").format(vndbalanceLock)}</span>
    ),
  },
  {
    title: t("payment.usdbalanceLock"),
    dataIndex: "usdbalanceLock",
    render: (usdbalanceLock) => (
      <span>{formatter("USD").format(usdbalanceLock)}</span>
    ),
  },
  {
    title: "status",
    key: "status",
    dataIndex: "status",
    width: 150,
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    render: (status) =>
      status === "COMPLETED" ? (
        <span className="p-2 border-2 rounded-md text-xs bg-green-500 text-white font-medium mr-2">
          {t("payment.completed")}
        </span>
      ) : status === "INPROGRESS" ? (
        <span className="p-2 bg-yellow-500 text-xs text-white rounded-md font-medium mr-2">
          {t("payment.inprogress")}
        </span>
      ) : (
        <span className="p-2 rounded-md bg-red-500 text-xs  text-white font-medium mr-2">
          {t("payment.cancel")}
        </span>
      ),
  },
];
export const orderColumns = [
  {
    title: t("event.background"),
    dataIndex: "background",
    render: (background) => (
      <img src={background} className="h-[2rem] w-auto" />
    ),
  },
  {
    title: t("event.name"),
    dataIndex: "name",
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
    width: 250,
  },
  {
    title: t("event.ticketTotal"),
    dataIndex: "ticketTotal",
  },
  {
    title: t("event.ticketRemaining"),
    dataIndex: "ticketRemaining",
  },
  {
    title: t("event.status.title"),
    dataIndex: "status",
    filters: [
      {
        text: t("event.status.available"),
        value: "event.available",
      },
      {
        text: t("event.status.completed"),
        value: "event.completed",
      },
      {
        text: t("event.status.soldout"),
        value: "event.sold-out",
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    render: (status) =>
      status === "event.available" ? (
        <span className="p-2 border-2 rounded-md text-xs  bg-green-500 text-white font-medium mr-2">
          {t("event.status.available")}
        </span>
      ) : status === "event.completed" ? (
        <span className="p-2 bg-yellow-500 text-xs  text-white rounded-md font-medium mr-2">
          {t("event.status.completed")}
        </span>
      ) : (
        <span className="p-2 rounded-md bg-red-500 text-xs  text-white font-medium mr-2">
          {t("event.status.soldout")}
        </span>
      ),
  },
  {
    title: t("event.modify"),
    key: "action",
    render: (_, record) => (
      <div
        className="text-[#1f3e82] font-medium flex items-center gap-x-2 cursor-pointer"
        onClick={() => {
          store.dispatch(setEventId(record.id));
          store.dispatch(setOpenModal(true));
        }}
      >
        <span>{t("view-detail")}</span> <BsFillEyeFill />{" "}
      </div>
    ),
  },
];
export const categoryColumns = [
  {
    title: t("category.title"),
    dataIndex: "name",
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
    render: (category) => <p>{t(category)}</p>,
  },
  // {
  //   title: t("event.modify"),
  //   key: "action",
  //   render: (_, record) => (
  //     <div className="flex items-center gap-2">
  //       <RiEditFill
  //         className="text-primary text-xl cursor-pointer"
  //         onClick={() => window.location.replace(`/event/update/${record.id}`)}
  //       />
  //       <FaTrashAlt
  //         className="text-primary text-xl cursor-pointer"
  //         onClick={() => {
  //           AlertQuestion({
  //             title: t("popup.event.delete"),
  //             callback: async (result) => {
  //               if (result.isConfirmed) {
  //                 const response = await deleteEvent(
  //                   record.id,
  //                   store.getState().account.userInfo.id
  //                 );
  //                 if (response.status === 200) {
  //                   AlertPopup({
  //                     title: t("popup.event.delete-success"),
  //                     timer: 5000,
  //                   });
  //                 }
  //               }
  //             },
  //           });
  //         }}
  //       />
  //     </div>
  //   ),
  // },
];
export const accountColumns = [
  {
    title: t("user.name"),
    dataIndex: "name",
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Email",
    dataIndex: "email",
    defaultSortOrder: "descend",
    onFilter: (value, record) => record.email.indexOf(value) === 0,
    sorter: (a, b) => a.email - b.email,
    sortDirections: ["descend"],
  },
  {
    title: t("loginTime"),
    dataIndex: "loginTime",
    defaultSortOrder: "descend",
    onFilter: (value, record) => record.loginTime.indexOf(value) === 0,
    sorter: (a, b) => a.loginTime - b.loginTime,
    sortDirections: ["descend"],
    render: (time) => (
      <p>{time ? convertMongodbTimeToString(time) : t("no-infomation")}</p>
    ),
  },
  {
    title: t("account.role"),
    dataIndex: "role",
    filters: [
      {
        text: t("role.user"),
        value: ROLE.Customer,
      },
      {
        text: t("role.organizer"),
        value: ROLE.Organizer,
      },
      {
        text: t("role.admin"),
        value: ROLE.Admin,
      },
    ],
    render: (role) => (
      <>
        {role === ROLE.Customer ? (
          <span className="p-2 bg-yellow-100 border-2 text-xs   rounded-md border-yellow-500 text-yellow-500 font-medium">
            {t("role.user")}
          </span>
        ) : role === ROLE.Organizer ? (
          <span className="p-2 bg-blue-100 border-2  text-xs  rounded-md border-blue-500 text-blue-500 font-medium ">
            {t("role.organizer")}
          </span>
        ) : (
          <span className="p-2 bg-violet-100 border-2 text-xs  rounded-md  border-violet-500 text-violet-500 font-medium ">
            {t("role.admin")}
          </span>
        )}
      </>
    ),
    onFilter: (value, record) => record.role.indexOf(value) === 0,
  },
];
export const orderByAccountColumns = [
  {
    title: t("user.name"),
    dataIndex: "name",
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Email",
    dataIndex: "email",
    defaultSortOrder: "descend",
    onFilter: (value, record) => record.email.indexOf(value) === 0,
    sorter: (a, b) => a.email - b.email,
    sortDirections: ["descend"],
  },
  {
    title: t("loginTime"),
    dataIndex: "loginTime",
    defaultSortOrder: "descend",
    onFilter: (value, record) => record.loginTime.indexOf(value) === 0,
    sorter: (a, b) => a.loginTime - b.loginTime,
    sortDirections: ["descend"],
    render: (time) => (
      <p>{time ? convertMongodbTimeToString(time) : t("no-infomation")}</p>
    ),
  },
  {
    title: t("event.modify"),
    key: "action",
    render: (_, record) => (
      <div className="flex items-center gap-x-2 cursor-pointer">
        <BsFillEyeFill color="#1f3e82" />
        <span className="text-[#1f3e82] font-medium">{t("view-detail")}</span>
      </div>
    ),
  },
];
export const pendingAccountsColumns = [
  {
    title: t("user.name"),
    dataIndex: "name",
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Email",
    dataIndex: "email",
    defaultSortOrder: "descend",
    onFilter: (value, record) => record.email.indexOf(value) === 0,
    sorter: (a, b) => a.email - b.email,
    sortDirections: ["descend"],
  },
  {
    title: t("account.status"),
    dataIndex: "status",
    render: (status) => (
      <>
        {status === AccountStatus.disabled && (
          <span className="p-2 bg-yellow-100 border-2  rounded-md border-yellow-500 text-yellow-500 font-medium">
            {t("account.pending-status")}
          </span>
        )}
      </>
    ),
  },
  {
    title: t("event.modify"),
    key: "action",
    width: 250,
    render: (_, record) => (
      <div className="flex items-center justify-center gap-x-2">
        <button
          className="text-white font-semibold bg-green-600 px-2 py-1 flex items-center gap-x-1 rounded-sm"
          onClick={() => {
            AlertQuestion({
              title: t("popup.account.approve"),
              callback: async (result) => {
                if (result.isConfirmed) {
                  const response = await approveOrganizer({
                    email: record.email,
                  });
                  if (response.status === 200) {
                    AlertPopup({
                      title: t("popup.account.approve-success"),
                      timer: 5000,
                    });
                  } else {
                    AlertErrorPopup({
                      title: t("popup.account.approve-fail"),
                      timer: 5000,
                    });
                  }
                }
              },
            });
          }}
        >
          <BsCheckLg />
          <span>{t("account.approve")}</span>
        </button>
        <button
          className="text-white font-semibold bg-red-600 px-2 py-1 flex items-center gap-x-1 rounded-sm"
          onClick={() => {
            AlertQuestion({
              title: t("popup.account.refuse"),
              callback: async (result) => {
                if (result.isConfirmed) {
                  const response = await refuseOrganizer({
                    email: record.email,
                  });
                  if (response.status === 200) {
                    AlertPopup({
                      title: t("popup.account.refuse-success"),
                      timer: 5000,
                    });
                  } else {
                    AlertErrorPopup({
                      title: t("popup.account.refuse-fail"),
                      timer: 5000,
                    });
                  }
                }
              },
            });
          }}
        >
          <BsXLg />
          <span>{t("account.disabled")}</span>
        </button>
      </div>
    ),
  },
];

export const OrganizerRoute = [
  {
    title: "sider.dashboard",
    links: [
      {
        name: "sider.overview",
        route: "overview",
        icon: <FiShoppingBag />,
      },
    ],
  },

  {
    title: "sider.management",
    links: [
      {
        name: "sider.event",
        route: "events",
        icon: <AiOutlineCalendar />,
      },
      {
        name: "sider.order",
        route: "orders",
        icon: <AiOutlineShoppingCart />,
      },
      {
        name: "sider.ticket",
        route: "tickets",
        icon: <IoTicketOutline />,
      },
      {
        name: "sider.payment",
        route: "payment-list",
        icon: <IoTicketOutline />,
      },
    ],
  },
];
export const AdminRoute = [
  {
    title: "sider.dashboard",
    links: [
      {
        name: "sider.overview",
        route: "overview",
        icon: <FiShoppingBag />,
      },
    ],
  },
  {
    title: "sider.management",
    links: [
      {
        name: "sider.account",
        route: "accounts",
        icon: <MdOutlineAccountCircle />,
      },
      {
        name: "sider.category",
        route: "categories",
        icon: <BiCategory />,
      },
    ],
  },
];
export const categoryIcon = (categoryName) => {
  switch (categoryName) {
    case "category.exhibition":
      return <AiOutlinePicture color="white" fontSize={64} />;
    case "category.music":
      return <FaMusic color="white" fontSize={64} />;
    case "category.travel":
      return <MdOutlineTravelExplore color="white" fontSize={64} />;
    case "category.seminar":
      return <RiSuitcaseFill color="white" fontSize={64} />;
    case "category.courses":
      return <BiBookBookmark color="white" fontSize={64} />;
    case "category.theater":
      return <FaTheaterMasks color="white" fontSize={64} />;
    case "category.sport":
      return <MdSportsSoccer color="white" fontSize={64} />;
    case "category.nightlife":
      return <MdOutlineNightlife color="white" fontSize={64} />;
    case "category.conference":
      return <BsPeopleFill color="white" fontSize={64} />;
    case "category.community":
      return <TbWorld color="white" fontSize={64} />;
    default:
      return <FaMusic color="white" fontSize={64} />;
  }
};
