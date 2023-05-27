/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/common/header";
import HelmetHeader from "../../components/helmet";
import { Pagination } from "antd";
import { motion } from "framer-motion";
import organizationServices, {
  useFindOrganizerById,
  useFindOrganizerEventList,
} from "../../api/services/organizationServices";
import { useDispatch, useSelector } from "react-redux";
import {
  organizerInfoSelector,
  updateOrganizerInfo,
} from "../../redux/slices/eventSlice";
import {
  htmlToPlainText,
  isArray,
  isEmpty,
  isNotEmpty,
  sortEventsByStartingDate,
} from "../../utils/utils";
import customerServices, {
  useCheckFollowedOrg,
} from "../../api/services/customerServices";
import { filter, includes } from "lodash";
import { userInfoSelector } from "../../redux/slices/accountSlice";
import { AlertErrorPopup } from "../../components/common/alert";
import { useTranslation } from "react-i18next";
import FollowButton from "../../components/follow-button";
import EventHomeSkeletonItem from "../../components/event-home-skeleton";
import EventHomeItem from "../../components/common/event-home-item";
import TabSection from "./tab-section";
import constants from "../../utils/constants";
import FooterComponent from "../../components/FooterComponent";
const { findOrganizerEventList } = organizationServices;
const { EventStatus } = constants;
const { unfollowOrg, followOrg, findAllCustomer } = customerServices;
function OrganizerProfile() {
  const { organizerId } = useParams();
  const dispatch = useDispatch();
  const { data: organizer, isLoading: organizerLoading } =
    useFindOrganizerById(organizerId);
  const [activeTab, setActiveTab] = useState("all-events");
  const user = useSelector(userInfoSelector);
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showFollowed, setShowFollowed] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventLoading, setEventLoading] = useState(false);
  const [numberFollowers, setNumberFollowers] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    setCurrentPage(0);
  }, [activeTab]);
  const firstIndex = currentPage * 12;
  const lastIndex = (currentPage + 1) * 12;
  // changePage
  const onChangePage = (page) => {
    setCurrentPage(page - 1);
  };
  useEffect(() => {
    async function fetchOrganizerFollower() {
      const customerList = await findAllCustomer();
      const itemsWithFollowEmail =
        isArray(customerList) &&
        filter(customerList, (item) =>
          includes(item.followList, organizer?.email)
        );
      setNumberFollowers(itemsWithFollowEmail.length);
    }
    if (organizer) {
      async function fetchEventsByOrganizerEmail() {
        setEventLoading(true);
        const response = await findOrganizerEventList(organizer.email);
        setEventLoading(false);
        if (isArray(response)) {
          setEvents(response);
        }
      }
      fetchEventsByOrganizerEmail();
    }

    fetchOrganizerFollower();
  }, [showFollowed, organizer]);
  console.log({ events });
  const { data: isFollowed, isLoading } = useCheckFollowedOrg(
    user?.email,
    organizer?.email
  );
  useEffect(() => {
    if (!isLoading) {
      setShowFollowed(isFollowed);
    }
    if (!user) {
      setShowFollowed(false);
    }
  }, [isFollowed, isLoading, user]);
  const handleCheckAuthenticated = () => {
    if (isEmpty(user)) {
      AlertErrorPopup({
        title: t("user.unauthenticated.title"),
        text: t("user.unauthenticated.text"),
      });
      navigate("/login");
    } else {
      navigate(`/organizer-profile/${organizerId}`);
    }
  };
  const handleFollowClick = () => {
    const email = organizer?.email;
    async function handleFollowOrganizer() {
      if (isEmpty(user)) {
        handleCheckAuthenticated();
      } else {
        if (showFollowed) {
          await unfollowOrg(user.id, email);
          setShowFollowed(false);
        }
        // Otherwise, follow the organizer?.
        else {
          await followOrg(user.id, email);
          setShowFollowed(true);
        }
      }
    }
    handleFollowOrganizer();
  };
  // framer motion
  const container = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };
  const completedEvents = isNotEmpty(events)
    ? events?.filter((event) => event.status === EventStatus.COMPLETED)
    : [];
  const featuredEvents = isNotEmpty(events)
    ? events?.filter((event) => event.status === EventStatus.AVAILABLE)
    : [];
  console.log(sortEventsByStartingDate(events));
  function EventListSection(activeTab) {
    switch (activeTab) {
      case "all-events":
        return (
          isArray(events) &&
          sortEventsByStartingDate(events)
            ?.slice(firstIndex, lastIndex)
            .map((event, index) => <EventHomeItem event={event} key={index} />)
        );
      case "completed-events":
        return sortEventsByStartingDate(completedEvents)
          ?.slice(firstIndex, lastIndex)
          .map((event, index) => <EventHomeItem event={event} key={index} />);
      case "featured-events":
        return sortEventsByStartingDate(featuredEvents)
          ?.slice(firstIndex, lastIndex)
          .map((event, index) => <EventHomeItem event={event} key={index} />);
      default:
        return (
          isArray(events) &&
          sortEventsByStartingDate(events)?.map((event, index) => (
            <EventHomeItem event={event} key={index} />
          ))
        );
    }
  }
  function EventPagination(activeTab) {
    switch (activeTab) {
      case "all-events":
        return (
          isNotEmpty(events) && (
            <Pagination
              current={currentPage + 1}
              onChange={onChangePage}
              total={events.length}
              pageSize={12}
              defaultCurrent={1}
            />
          )
        );
      case "completed-events":
        return (
          isNotEmpty(completedEvents) && (
            <Pagination
              current={currentPage + 1}
              onChange={onChangePage}
              total={completedEvents.length}
              pageSize={12}
              defaultCurrent={1}
            />
          )
        );
      case "featured-events":
        return (
          isNotEmpty(featuredEvents) && (
            <Pagination
              current={currentPage + 1}
              onChange={onChangePage}
              total={featuredEvents.length}
              pageSize={12}
              defaultCurrent={1}
            />
          )
        );
      default:
        return (
          isNotEmpty(events) &&
          events?.map((event, index) => (
            <EventHomeItem event={event} key={index} />
          ))
        );
    }
  }
  return (
    <>
      <HelmetHeader title={"Organizer Profile"} />
      <Header />
      <div className="w-screen relative">
        <img
          className="w-screen h-[60vh] object-cover object-center"
          src={
            "https://static.vecteezy.com/system/resources/previews/001/987/748/original/abstract-template-blue-geometric-diagonal-overlap-layer-on-dark-blue-background-free-vector.jpg"
          }
          alt="cover"
        />
        <div className="absolute top-[45vh] z-[999] w-full flex justify-center ">
          <img
            src={organizer?.avatar}
            className="object-cover rounded-full border-gray-400 border-4 border-solid shadow-lg shadow-black"
            style={{ width: "200px", height: "200px" }}
            alt="avatar"
          />
        </div>
        <div className="mt-32 flex justify-center flex-col items-center relative">
          <div className="relative">
            <h1 className="font-bold text-3xl flex items-center gap-x-4 mb-2">
              <span className="golden-badge">{organizer?.name}</span>
            </h1>
            <div className="flex justify-center">
              <FollowButton
                handleFollowClick={handleFollowClick}
                showFollowed={showFollowed}
              />
            </div>
          </div>
          <p className="w-[50vw] text-center mt-2">
            {htmlToPlainText(organizer?.biography)}
          </p>
        </div>
        <div className="flex justify-center items-center gap-x-4 my-4">
          <div className="text-center">
            <h2 className=" text-gray-500">{t("followers")}</h2>
            <h1 className="font-bold text-2xl">{numberFollowers}</h1>
          </div>
          <div className="text-center pl-4 border-l-[1px] border-solid border-gray-200">
            <h2 className=" text-gray-500">{t("event.list")}</h2>
            <h1 className="font-bold text-2xl">
              {isArray(events) ? events?.length : 0}
            </h1>
          </div>
        </div>
      </div>
      <hr className="mt-4 mx-8" />
      <TabSection activeTab={activeTab} setActiveTab={setActiveTab} />
      <motion.div
        className="home-popular-content"
        style={{ padding: "0 4rem", justifyContent: "center" }}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {eventLoading
          ? [...Array(16)].map((i) => <EventHomeSkeletonItem />)
          : EventListSection(activeTab)}
      </motion.div>
      <div className="event-pagination my-4">{EventPagination(activeTab)}</div>
      <FooterComponent
        toggleDrawer={toggleDrawer}
        setToggleDrawer={setToggleDrawer}
      />
    </>
  );
}

export default OrganizerProfile;
