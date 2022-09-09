import React from "react";
import lincense from "../../../assets/license.png";
function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-top"></div>
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <p className="website-logo "></p>
          <div className="flex flex-col">
            <span>
              Hệ thống quản lý và phân phối vé sự kiện số 1 Võ Văn Ngân
            </span>
            <span>LotuTicket Co. Ltd. © 2022</span>
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
