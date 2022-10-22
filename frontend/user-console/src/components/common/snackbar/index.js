import Snackbar from "@mui/material/Snackbar";
import React from "react";

export default function Notification(props) {
  const { message } = props;
  const [state, setState] = React.useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
      />
    </div>
  );
}
