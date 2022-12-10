import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { t } from "i18next";
import React from "react";
function InfoCollapse(props) {
  const { item, children } = props;
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className="block">
      <ListItemButton
        onClick={handleClick}
        style={{ borderBottom: "1px solid #dddddd", color: "black" }}
      >
        <div className="flex w-full justify-between ">
          <div style={{ display: "flex", alignItems: "center", gap: "0 1rem" }}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={t(item.text, { val: item.value })} />
          </div>
          {open ? <ExpandLess /> : <ExpandMore />}
        </div>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </div>
  );
}
export default InfoCollapse;
