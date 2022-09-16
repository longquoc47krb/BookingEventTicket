/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Link, useNavigate } from "react-router-dom";
import { AppConfig } from "../../../configs/AppConfig";
import Paper from "@mui/material/Paper";
const { MENU } = AppConfig;
function SiderBar(props) {
  const { className } = props;
  const navigate = useNavigate();
  return (
    <div className={className}>
      <Paper sx={{ width: 250, minHeight: "100%" }}>
        <MenuList>
          {MENU.map((item, index) => (
            <MenuItem className="mb-2" onClick={() => navigate(item.link)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.label}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Paper>
    </div>
  );
}

export default SiderBar;
