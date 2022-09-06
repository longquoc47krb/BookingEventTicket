import { Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AppConfig } from "../../../configs/AppConfig";
const { MENU } = AppConfig;
function SiderBar() {
  function SelectedKey() {
    const location = useLocation();
    switch (location.pathname) {
      case "/":
        return ["0"];
      case "/events?category=music":
        return ["1"];
      case "/events?category=theater":
        return ["2"];
      default:
        return ["0"];
    }
  }
  return (
    <div>
      <Sider width={250}>
        <Menu
          style={{ minHeight: "100vh", height: "100%" }}
          defaultSelectedKeys={SelectedKey}
        >
          {MENU.map((item, index) => (
            <Menu.Item key={index} style={{ color: "white" }}>
              <Link
                to={`${item.link}?category=${item.key}`}
                className="flex items-center gap-x-2"
              >
                {item.icon}
                {item.label}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    </div>
  );
}

export default SiderBar;
