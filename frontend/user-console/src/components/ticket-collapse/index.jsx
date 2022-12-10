import React from "react";
import Collapse from "@mui/material/Collapse";
import { t } from "i18next";
import { List, ListItemButton, ListItemText } from "@mui/material";
import parse from "html-react-parser";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { formatter } from "../../utils/utils";
import { TicketStatus } from "../../utils/constants";
function TicketComponent(props) {
  const { ticket } = props;
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const renderTicketStatus = (status) => {
    switch (status) {
      case TicketStatus.SOLD_OUT:
        return (
          <div className="px-3 border-red-600 border-2 bg-white text-red-600 font-semibold text-xl">
            {t(status)}
          </div>
        );
      case TicketStatus.BEST_SELLER:
        return (
          <div className="px-3 border-green-600 border-2 bg-white text-green-600 font-semibold text-xl">
            {t(status)}
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <>
      <ListItemButton
        onClick={handleClick}
        style={{ borderBottom: "1px solid #dddddd" }}
      >
        <div className="flex w-full justify-between ">
          {!ticket.description ? null : open ? (
            <ExpandLess className="absolute left-[4px] top-[14px]" />
          ) : (
            <ExpandMore className="absolute left-[4px] top-[14px]" />
          )}
          <ListItemText
            primary={ticket.ticketName}
            style={{ paddingLeft: "1rem" }}
          />
          <div className="flex items-center justify-end gap-x-2">
            {renderTicketStatus(ticket.status)}
            <ListItemText
              primary={formatter(ticket.currency).format(ticket.price)}
            />
          </div>
        </div>
      </ListItemButton>
      {ticket.description && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              style={{ background: "#3f4c77", color: "white", padding: "1rem" }}
            >
              <div>{parse(ticket.description)}</div>
            </ListItemButton>
          </List>
        </Collapse>
      )}
    </>
  );
}
export default TicketComponent;
