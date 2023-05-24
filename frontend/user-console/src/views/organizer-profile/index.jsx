import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/common/header";
import HelmetHeader from "../../components/helmet";
import { motion } from "framer-motion";
import organizationServices, {
  useFindOrganizerEventList,
} from "../../api/services/organizationServices";
import { useDispatch, useSelector } from "react-redux";
import {
  organizerInfoSelector,
  updateOrganizerInfo,
} from "../../redux/slices/eventSlice";
import { htmlToPlainText, isArray, isEmpty } from "../../utils/utils";
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
const { findOrganizerById, findOrganizerEventList } = organizationServices;
const { unfollowOrg, followOrg, findAllCustomer } = customerServices;
function OrganizerProfile() {
  const { organizerId } = useParams();
  const dispatch = useDispatch();
  const organizer = useSelector(organizerInfoSelector);
  const user = useSelector(userInfoSelector);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showFollowed, setShowFollowed] = useState(false);
  const [numberFollowers, setNumberFollowers] = useState(0);
  const { data: events, isLoading: eventLoading } = useFindOrganizerEventList(
    organizer.email
  );
  useEffect(() => {
    async function fetchOrganizerFollower() {
      const customerList = await findAllCustomer();
      const itemsWithFollowEmail =
        isArray(customerList) &&
        filter(customerList, (item) =>
          includes(item.followList, organizer.email)
        );
      setNumberFollowers(itemsWithFollowEmail.length);
      console.log({ itemsWithFollowEmail });
    }
    async function fetchOrganizerInfo() {
      const organizer = await findOrganizerById(organizerId);
      dispatch(updateOrganizerInfo(organizer));
    }
    fetchOrganizerFollower();
    fetchOrganizerInfo();
  }, [showFollowed]);
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
    const email = organizer.email;
    async function handleFollowOrganizer() {
      if (isEmpty(user)) {
        handleCheckAuthenticated();
      } else {
        if (showFollowed) {
          await unfollowOrg(user.id, email);
          setShowFollowed(false);
        }
        // Otherwise, follow the organizer.
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
            src={organizer.avatar}
            className="object-cover rounded-full border-gray-400 border-4 border-solid shadow-lg shadow-black"
            style={{ width: "200px", height: "200px" }}
            alt="avatar"
          />
        </div>
        <div className="mt-32 flex justify-center flex-col items-center relative">
          <div className="relative">
            <h1 className="font-bold text-3xl">{organizer.name} </h1>
            <div className="absolute top-[0] right-[-8vw]">
              <FollowButton
                handleFollowClick={handleFollowClick}
                showFollowed={showFollowed}
              />
            </div>
          </div>
          <p className="w-[50vw] text-center mt-2">
            {htmlToPlainText(organizer.biography)}
          </p>
        </div>
        <div className="flex justify-center items-center gap-x-4 my-4">
          <div className="text-center">
            <h2 className=" text-gray-500">{t("followers")}</h2>
            <h1 className="font-bold text-2xl">{numberFollowers}</h1>
          </div>
          <div className="text-center pl-4 border-l-[1px] border-solid border-gray-200">
            <h2 className=" text-gray-500">{t("event.list")}</h2>
            <h1 className="font-bold text-2xl">{events?.length}</h1>
          </div>
        </div>
      </div>
      <motion.div
        className="home-popular-content"
        style={{ padding: "0 4rem", justifyContent: "center" }}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {eventLoading
          ? [...Array(16)].map((i) => <EventHomeSkeletonItem />)
          : isArray(events) &&
            events?.map((event, index) => (
              <EventHomeItem event={event} key={index} />
            ))}
      </motion.div>
    </>
  );
}

export default OrganizerProfile;
