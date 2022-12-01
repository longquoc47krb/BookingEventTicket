import React from "react";
import Collapse from "@mui/material/Collapse";
import { t } from "i18next";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import parse from "html-react-parser";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import { formatter } from "../../utils/utils";
import { TicketStatus } from "../../utils/constants";
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
