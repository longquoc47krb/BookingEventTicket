/* eslint-disable jsx-a11y/anchor-is-valid */
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import React from "react";
import { useTranslation } from "react-i18next";
import { GoOrganization } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { AppConfig } from "../../../configs/AppConfig";

const { MENU, MENU_ORG } = AppConfig;
function SiderBar(props) {
  const { className } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className={className}>
      <div
        style={{
          width: "18vw",
          height: "auto",
        }}
      >
        <MenuList>
          {MENU.map((item, index) => (
            <MenuItem className="mb-2" onClick={() => navigate(item.link)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{t(item.label)}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
        <hr className="px-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
        {MENU_ORG.map((item, index) => (
          <MenuItem className="sider-item" onClick={() => navigate(item.link)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{t(item.label)}</ListItemText>
          </MenuItem>
        ))}
        <button
          className="be-an-organization p-2 text-[#FFD933] text-base font-semibold rounded gap-x-2 flex items-center justify-center mb-3 ml-3"
          onClick={() => navigate("/be-an-organization")}
        >
          <GoOrganization color="#FFD933" />
          {t("org.become-an-org")}
        </button>
      </div>
    </div>
  );
}

export default SiderBar;
