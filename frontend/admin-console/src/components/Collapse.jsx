import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { ListItemButton, ListItemText } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import React from "react";
function CollapseComponent(props) {
  const { text, children } = props;
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
        <div className="flex w-full justify-between items-center">
          <ListItemText primary={text} />
          {open ? <AiOutlineMinusCircle /> : <AiOutlinePlusCircle />}
        </div>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </div>
  );
}
export default CollapseComponent;
