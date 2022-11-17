import { CloseOutlined } from "@mui/icons-material";
import { Drawer } from "antd";
import React, { useRef } from "react";
import { useClickAway } from "react-use";
import { useUserActionContext } from "../../../context/UserActionContext";
import SiderBar from "../sider";

function AppDrawer() {
  const { activeDrawer, toggleDrawer } = useUserActionContext();
  const ref = useRef();
  useClickAway(ref, () => {
    toggleDrawer(false);
  });
  return (
    <div ref={ref}>
      <Drawer
        closeIcon={<CloseOutlined />}
        placement={"left"}
        closable={false}
        onClose={() => toggleDrawer(false)}
        open={activeDrawer}
        key={"left"}
        className="w-[50vw]"
      >
        <SiderBar className="sider" />
      </Drawer>
    </div>
  );
}

export default AppDrawer;
