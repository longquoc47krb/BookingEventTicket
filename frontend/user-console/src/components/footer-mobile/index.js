import React from "react";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { ImHome } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { isNotEmpty } from "../../utils/utils";
function FooterMobile(props) {
  const { toggleDrawer, setToggleDrawer } = props;
  const { user } = useUserAuth();
  const navigate = useNavigate();
  function toggleSwitchHandler() {
    setToggleDrawer(!toggleDrawer);
  }
  return (
    <div className="w-full h-14 footer-mobile-container items-center flex px-20 py-4 justify-between">
      <BsFillGrid3X3GapFill
        fontSize={30}
        color="#ffffff"
        onClick={toggleSwitchHandler}
      />
      <ImHome fontSize={30} color="#ffffff" onClick={() => navigate("/")} />
      {isNotEmpty(user) ? (
        <img
          src={user.avatar}
          onClick={() => navigate("/profile")}
          className="rounded-full w-10 h-10 border-4 border-solid border-gray-300 shadow-md"
          alt="avatar"
        />
      ) : (
        <FaUserAlt
          fontSize={30}
          color="#ffffff"
          onClick={() => navigate("/login")}
        />
      )}
    </div>
  );
}

export default FooterMobile;
