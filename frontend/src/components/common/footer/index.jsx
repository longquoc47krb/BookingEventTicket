import React from "react";
import { useNavigate } from "react-router-dom";
import lincense from "../../../assets/license.png";
function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="footer-container">
      <div className="footer-top"></div>
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <img
            src="/logo.png"
            alt="logo"
            className="brand-logo"
            onClick={() => navigate("/")}
          />
          <div className="flex flex-col">
            <span>
              Hệ thống quản lý và phân phối vé sự kiện số 1 Võ Văn Ngân
            </span>
            <span>Lotus Ticket Co. Ltd. © 2022</span>
          </div>
        </div>
        <div className="footer-bottom-right">
          <div className="flex flex-col">
            <span>
              Giấy phép Kinh doanh số 123456789 <br></br>do Sở Kế hoạch & Đầu tư
              TPHCM cấp ngày 06/09/2022
            </span>
          </div>
          <img src={lincense} alt="lincense" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
