import React, { useState } from "react";
import theme from "../../../shared/theme";
import Avatar from "../avatar";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import IconButton from "@mui/material/IconButton";
import { Badge } from "@mui/material";
import CrossIcon from "../../../assets/CrossIcon.svg";
import CheckIcon from "../../../assets/CheckIcon.svg";
import axios from "axios";
function UploadImage({ avatar }) {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(avatar);
  const [showCameraButton, setShowCameraButton] = useState(true);
  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatarFile(reader.result);
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
  const uploadImage = async () => {
    setShowCameraButton(true);
    console.log({ avatarFile });
    const formData = new FormData();
    formData.append("file", avatarFile);
    formData.append("upload_preset", "admin_preset");
    return axios
      .post(
        "https://api.cloudinary.com/v1_1/lotus-ticket-2022/image/upload",
        formData
      )
      .then(function (response) {
        console.log({ response });
        setAvatarFile(response.data.url);
        return response.data.url;
      })
      .catch(function (error) {
        console.log(error);
      });
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
                  onClick={uploadImage}
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

export default UploadImage;
