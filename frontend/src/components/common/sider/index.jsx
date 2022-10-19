/* eslint-disable jsx-a11y/anchor-is-valid */
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { Divider } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { GoOrganization } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import AppConfig from "../../../configs/AppConfig";

const { MENU } = AppConfig;
function SiderBar(props) {
  const { className } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className={className}>
      <div
        style={{
          width: "18vw",
        }}
      >
        <Divider orientation="left">
          <span className="text-gray-600 font-semibold text-base">
            {t("category.menu")}
          </span>
        </Divider>
        <MenuList>
          {MENU.map((item, index) => (
            <MenuItem className="mb-2" onClick={() => navigate(item.link)}>
              <ListItemIcon style={{ fontSize: "0.6rem" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText style={{ fontSize: "0.6875rem" }}>
                {t(item.label)}
              </ListItemText>
            </MenuItem>
          ))}
        </MenuList>
        <Divider orientation="left">
          <span className="text-gray-600 font-semibold text-base">
            {t("org.menu")}
          </span>
        </Divider>
        <button
          className="organizer-registration p-2 text-[#FFD933] text-base font-semibold rounded gap-x-2 flex items-center justify-center mb-3 ml-3"
          onClick={() => navigate("/organizer-registration")}
        >
          <GoOrganization color="#FFD933" />
          {t("org.become-an-org")}
        </button>
      </div>
    </div>
  );
}

export default SiderBar;
