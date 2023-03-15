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
import { ImCross } from "react-icons/im";
const { submitReview, getReviewList, editReview } = reviewServices;

function Feedback(props) {
  const {
    message,
    isEditting,
    onCancel,
    star,
    setStar,
    setMessage,
    onSubmit,
    onUpdate,
    user,
  } = props;
  const { t } = useTranslation();

  return (
    <div className="feedback">
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
          <TextArea
            rows={4}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <div className="flex items-center gap-x-4">
            <button
              onClick={!isEditting ? onSubmit : onUpdate}
              className="flex items-center gap-x-1 primary-button w-auto"
            >
              <span>{t("submit")}</span> <IoSend />
            </button>
            {isEditting && (
              <button
                onClick={() => onCancel(false)}
                style={{ background: "#ff3a3a" }}
                className="flex items-center gap-x-1 basic-button w-auto"
              >
                <span>{t("cancel")}</span> <ImCross />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
