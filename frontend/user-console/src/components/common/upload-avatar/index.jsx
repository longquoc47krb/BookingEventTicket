import React, { useEffect, useState } from "react";
import theme from "../../../shared/theme";
import Avatar from "../avatar";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import IconButton from "@mui/material/IconButton";
import { Badge } from "@mui/material";
import CrossIcon from "../../../assets/CrossIcon.svg";
import CheckIcon from "../../../assets/CheckIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import accountServices from "../../../api/services/accountServices";
import {
  emailSelector,
  setUserProfile,
  userInfoSelector,
} from "../../../redux/slices/accountSlice";
const { updateAvatar } = accountServices;
function UploadAvatar({ avatar }) {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(avatar);
  const [showCameraButton, setShowCameraButton] = useState(true);
  const email = useSelector(emailSelector);
  const user = useSelector(userInfoSelector);
  const dispatch = useDispatch();
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
    setShowCameraButton(true);
    const formData = new FormData();
    formData.append("file", avatarFile);
    const response = await updateAvatar(email, formData);
    setAvatarFile(response.data.avatar);
  };
  useEffect(() => {}, [avatarPreview, avatarFile]);
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
            className="object-cover rounded-full w-[120px] h-[120px]"
          />
        </Badge>
      </div>
    </div>
  );
}

export default UploadAvatar;
