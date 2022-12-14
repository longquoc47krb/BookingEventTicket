import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import { Badge } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import accountServices from "../../../api/services/accountServices";
import CheckIcon from "../../../assets/CheckIcon.svg";
import CrossIcon from "../../../assets/CrossIcon.svg";
import { userInfoSelector } from "../../../redux/slices/accountSlice";
import theme from "../../../shared/theme";
import Avatar from "../avatar";
const { updateAvatar } = accountServices;
function UploadAvatar({ avatar }) {
  const user = useSelector(userInfoSelector);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(avatar);
  const [loading, setLoading] = useState(false);
  const [showCameraButton, setShowCameraButton] = useState(true);
  const { t } = useTranslation();
  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatarFile(e.target.files[0]);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setShowCameraButton(false);
  };
  const deleteAvatar = (e) => {
    setShowCameraButton(true);
    setAvatarPreview(null);
    setAvatarFile(avatar);
  };
  const UploadAvatar = async () => {
    setLoading(true);
    setShowCameraButton(true);
    const formData = new FormData();
    formData.append("file", avatarFile);
    const response = await updateAvatar(user.id, formData);
    if (response.status === 200) {
      setLoading(false);
      toast.success(t("update-avatar.success"), {
        duration: 5000,
      });
    } else {
      setLoading(false);
      toast.error(t("update-avatar.error"), {
        duration: 5000,
      });
    }
  };
  return (
    <div>
      <div>
        <Badge
          overlap="circular"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          badgeContent={
            !showCameraButton ? (
              <>
                <img
                  src={CrossIcon}
                  alt="cross-icon"
                  className="w-7 h-7"
                  onClick={deleteAvatar}
                />
                <img
                  src={CheckIcon}
                  alt="cross-icon"
                  className="w-7 h-7"
                  onClick={UploadAvatar}
                />
              </>
            ) : (
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  accept="image/png, image/jpeg, image/jpg"
                  type="file"
                  name="file"
                  onChange={updateProfileDataChange}
                />
                <CameraAltRoundedIcon
                  fontSize="medium"
                  onChange={updateProfileDataChange}
                  style={{
                    background: theme.main,
                    width: 25,
                    height: 25,
                    color: "white",
                    padding: 5,
                    borderRadius: 50,
                    cursor: "pointer",
                  }}
                />
              </IconButton>
            )
          }
        >
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input
              hidden
              accept="image/png, image/jpeg, image/jpg"
              type="file"
              onChange={updateProfileDataChange}
            />
          </IconButton>
          <Avatar
            avatar={avatarPreview ? avatarPreview : avatarFile}
            className="object-cover rounded-full"
            style={{ width: "120px", height: "120px" }}
            loading={loading}
          />
        </Badge>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}

export default UploadAvatar;
