/* eslint-disable jsx-a11y/anchor-is-valid */
import { Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AppConfig } from "../../../configs/AppConfig";
const { MENU } = AppConfig;
function SiderBar() {
  const navigate = useNavigate();
  return (
    <div className="sider">
      <Sider width={250}>
        <Menu style={{ minHeight: "100vh", height: "100%" }}>
          {MENU.map((item, index) => (
            <Menu.Item key={index} style={{ color: "white" }}>
              <a
                onClick={() => navigate(`${item.link}`)}
                className="flex items-center gap-x-2"
              >
                {item.icon}
                {item.label}
              </a>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    </div>
  );
}

export default SiderBar;
