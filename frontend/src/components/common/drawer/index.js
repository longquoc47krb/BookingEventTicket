import { CloseOutlined } from "@mui/icons-material";
import { Drawer } from "antd";
import React, { useRef } from "react";
import { useClickAway } from "react-use";
import { useUserActionContext } from "../../../context/UserActionContext";
import SiderBar from "../sider";

function AppDrawer() {
  const { showDrawer, setShowDrawer } = useUserActionContext();
  const ref = useRef();
  useClickAway(ref, () => {
    setShowDrawer(false);
  });
  return (
    <div ref={ref}>
      <Drawer
        closeIcon={<CloseOutlined />}
        placement={"left"}
        closable={false}
        onClose={() => setShowDrawer(false)}
        open={showDrawer}
        key={"left"}
        className="w-[50vw]"
      >
        <SiderBar className="sider" />
      </Drawer>
    </div>
  );
}

export default AppDrawer;
