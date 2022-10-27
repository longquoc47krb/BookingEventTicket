import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import jwt_decode from "jwt-decode";
import accountServices from "../../api/services/accountServices";
import { useDispatch } from "react-redux";
import { setUserProfile } from "../../redux/slices/accountSlice";
import Countdown from "react-countdown";
const { findUser } = accountServices;
const OAuthLogin = () => {
  const [tokenParams, setTokenParams] = useSearchParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token =
    tokenParams.get("token") !== null ? tokenParams.get("token") : false;
  useEffect(() => {
    if (token) {
      const email = jwt_decode(token).sub;
      const fetchUser = async () => {
        const response = await findUser(email);
        if (response.status === 200) {
          dispatch(setUserProfile(response.data));
        }
      };
      fetchUser();
    }
    setTimeout(() => {
      if (token) {
        return navigate("/");
      }
      return navigate("/login");
    }, 5000);
  }, [token]);
  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    return <span>{seconds}s</span>;
  };

  return (
    <div className="w-screen h-screen bg-white">
      <h1 className="text-2xl">
        {token ? t("user.oauth.success") : t("user.oauth.failed")}{" "}
        <Countdown date={Date.now() + 5000} renderer={renderer} />
      </h1>
    </div>
  );
};
export default OAuthLogin;
