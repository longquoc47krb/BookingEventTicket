import React from "react";
import Collapse from "@mui/material/Collapse";
import { data } from "autoprefixer";
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
function TicketComponent(props) {
  const { ticket } = props;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemButton
        onClick={handleClick}
        className="mb-2  border-b-[0.5px] border-b-gray-200"
      >
        <div className="flex w-full justify-between">
          <ListItemText primary={ticket.ticketName} />
          <div>
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
