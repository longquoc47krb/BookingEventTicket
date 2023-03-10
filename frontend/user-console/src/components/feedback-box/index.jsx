import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { useTranslation } from "react-i18next";
import RatingStar from "../rating";
import { IoSend } from "react-icons/io5";
import { userInfoSelector } from "../../redux/slices/accountSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import reviewServices from "../../api/services/reviewServices";

const { submitReview, getReviewList } = reviewServices;

function Feedback() {
  const [star, setStar] = useState(5);
  const [text, setText] = useState("");
  const { t } = useTranslation();
  const { eventId } = useParams();
  console.log({ star, text });
  const user = useSelector(userInfoSelector);

  const handleSubmit = async () => {
    const response = await submitReview(user.id, {
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      idEvent: eventId,
      message: text,
      rate: star,
    });
    await getReviewList(eventId);
  };

  return (
    <div className="feedback">
      <p className="text-[#1f3e82] font-bold text-2xl px-4 py-2">
        {t("your-feedback")}
      </p>
      <div className="feedback-container">
        <img
          src={user.avatar}
          className="w-full aspect-square rounded-full bg-red-500 avatar"
          alt="avatar"
        />
        <div className="rating">
          {" "}
          <RatingStar value={star} setValue={setStar} />{" "}
        </div>
        <div className="feedbackInput">
          <TextArea rows={4} onChange={(e) => setText(e.target.value)} />
          <button
            onClick={handleSubmit}
            className="flex items-center gap-1 primary-button w-auto"
          >
            <span>{t("submit")}</span> <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
