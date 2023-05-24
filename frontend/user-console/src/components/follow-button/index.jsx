import React from "react";
import { useTranslation } from "react-i18next";
import { SlUserFollow, SlUserFollowing } from "react-icons/sl";

function FollowButton({ handleFollowClick, showFollowed }) {
  const { t } = useTranslation();
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
  return (
    <button
      className={followButtonTheme[!!showFollowed].theme}
      onClick={handleFollowClick}
    >
      {followButtonTheme[!!showFollowed].title}
    </button>
  );
}

export default FollowButton;
