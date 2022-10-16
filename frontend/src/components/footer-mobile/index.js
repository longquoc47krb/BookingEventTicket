import React from "react";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { ImHome } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { isNotEmpty } from "../../utils/utils";
function FooterMobile() {
  const { user } = useUserAuth();
  const navigate = useNavigate();
  return (
    <div className="w-full h-14 footer-mobile-container items-center flex px-20 py-4 justify-between">
      <BsFillGrid3X3GapFill fontSize={30} color="#ffffff" />
      <ImHome fontSize={30} color="#ffffff" />
      <FaUserAlt
        fontSize={30}
        color="#ffffff"
        onClick={
          isNotEmpty(user)
            ? () => navigate("/profile")
            : () => navigate("/login")
        }
      />
    </div>
  );
}

export default FooterMobile;
