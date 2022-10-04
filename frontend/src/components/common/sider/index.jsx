/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useNavigate } from "react-router-dom";
import { AppConfig } from "../../../configs/AppConfig";
import Paper from "@mui/material/Paper";
import { BsFillBriefcaseFill } from "react-icons/bs";
const { MENU, MENU_ORG } = AppConfig;
function SiderBar(props) {
  const { className } = props;
  const navigate = useNavigate();
  return (
    <div className={className}>
      <Paper
        sx={{ width: 250, height: "auto", padding: "0.2rem" }}
        className="relative"
      >
        <MenuList>
          {MENU.map((item, index) => (
            <MenuItem className="mb-2" onClick={() => navigate(item.link)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.label}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
        <hr className="px-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
        {MENU_ORG.map((item, index) => (
          <MenuItem className="mb-2" onClick={() => navigate(item.link)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        ))}
        <button className="be-an-organization p-2 text-[#FFD933] text-base font-semibold rounded gap-x-2 flex items-center justify-center mb-3 ml-3">
          <BsFillBriefcaseFill color="#FFD933" />
          Trở thành nhà tổ chức
        </button>
      </Paper>
    </div>
  );
}

export default SiderBar;
