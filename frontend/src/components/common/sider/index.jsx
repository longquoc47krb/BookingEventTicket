/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useNavigate } from "react-router-dom";
import { AppConfig } from "../../../configs/AppConfig";
import Paper from "@mui/material/Paper";
import { BsFillBriefcaseFill } from "react-icons/bs";
import Swal from "sweetalert2/dist/sweetalert2.js";
const { MENU, MENU_ORG } = AppConfig;
function SiderBar(props) {
  const { className } = props;
  const navigate = useNavigate();
  const handleOpenSwal = () => {
    Swal.fire({
      title: "Bạn muốn trở thành Nhà Tổ Chức?",
      text: "Nhấn OK để chuyển đến trang Đăng ký",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#004C6D",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/be-an-organization");
      }
    });
  };
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
        <button
          className="be-an-organization p-2 text-[#FFD933] text-base font-semibold rounded gap-x-2 flex items-center justify-center mb-3 ml-3"
          onClick={handleOpenSwal}
        >
          <BsFillBriefcaseFill color="#FFD933" />
          Trở thành nhà tổ chức
        </button>
      </Paper>
    </div>
  );
}

export default SiderBar;
