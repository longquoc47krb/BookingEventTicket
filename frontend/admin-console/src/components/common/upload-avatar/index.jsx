import { Badge } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import { BsFillCameraFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import accountServices from "../../../api/services/accountServices";
import CheckIcon from "../../../assets/CheckIcon.svg";
import CrossIcon from "../../../assets/CrossIcon.svg";
import { setUserAvatar } from "../../../redux/slices/accountSlice";
import { isNotEmpty } from "../../../utils/utils";
import Avatar from "../avatar";
function UploadAvatar({ avatar }) {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(avatar);
  const [showCameraButton, setShowCameraButton] = useState(true);
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
    const form = new FormData();
    form.append("file", avatarFile);
    dispatch(setUserAvatar(form))
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
                <BsFillCameraFill
                  onChange={updateProfileDataChange}
                  style={{
                    background: "#1F3E82",
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
              accept="image/png, image/jpeg, image/jpg, image/webp"
              type="file"
              onChange={updateProfileDataChange}
            />
          </IconButton>
          <Avatar
            avatar={avatarPreview ? avatarPreview : avatarFile}
            className="object-cover rounded-full"
            style={{ width: "120px", height: "120px" }}
          />
        </Badge>
      </div>
    </div>
  );
}

export default UploadAvatar;
