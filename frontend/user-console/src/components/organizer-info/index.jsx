import React, { forwardRef, useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import parse from "html-react-parser";
import { t } from "i18next";
import { isEmpty } from "lodash";
import customerServices, {
  useCheckFollowedOrg,
} from "../../api/services/customerServices";
import { useSelector } from "react-redux";
import { organizerInfoSelector } from "../../redux/slices/eventSlice";
import { SlUserFollow, SlUserFollowing } from "react-icons/sl";
const { unfollowOrg, followOrg } = customerServices;

const OrganizerInfo = forwardRef((props, ref) => {
  const { handleCheckAuthenticated, user } = props;
  const [showFollowed, setShowFollowed] = useState(false);
  const organizer = useSelector(organizerInfoSelector);
  const { data: isFollowed, isLoading } = useCheckFollowedOrg(
    user?.email,
    organizer?.email
  );
  const followButtonTheme = {
    false: {
      theme:
        "bg-white px-2 py-1 text-[#1F3E82] border-[#1F3E82] border-2 rounded-2xl flex gap-x-2 items-center text-sm",
      title: (
        <>
          <SlUserFollow />
          <span>{t("org.follow")}</span>
        </>
      ),
    },
    true: {
      theme:
        "bg-[#1F3E82] px-2 py-1 text-white border-white border-2 rounded-2xl flex gap-x-2 items-center text-sm",
      title: (
        <>
          <SlUserFollowing />
          <span>{t("org.followed")}</span>
        </>
      ),
    },
  };
  useEffect(() => {
    if (!isLoading) {
      setShowFollowed(isFollowed);
    }
    if (!user) {
      setShowFollowed(false);
    }
  }, [isFollowed, isLoading, user]);
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
  return (
    <>
      <div ref={ref} className="organization">
        {t("organizer")}
      </div>
      <div className="event-detail-organization">
        <img
          src={organizer?.avatar}
          alt="logo"
          className="rounded-md border-3 border-white border-solid drop-shadow-md"
        />
        <div className="flex gap-x-4 items-start">
          <h1>{organizer?.name}</h1>
          <button
            className={followButtonTheme[!!showFollowed].theme}
            onClick={handleFollowClick}
          >
            {followButtonTheme[!!showFollowed].title}
          </button>
        </div>
        <p>{parse(String(organizer?.biography))}</p>
        <button
          className="event-detail-organization-contact"
          onClick={() => {
            window.open(`mailto:${organizer?.email}`, "_blank");
          }}
        >
          <AiOutlineMail />
          {t("org.contact")}
        </button>
      </div>
    </>
  );
});

export default OrganizerInfo;
