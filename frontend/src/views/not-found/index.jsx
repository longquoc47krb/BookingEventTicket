import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFetchEvents } from "../../api/services/eventServices";
import NotFoundImage from "../../assets/404.svg";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import SearchBox from "../../components/common/searchbox";
import { pathNameSelector } from "../../redux/slices/locationSlice";
function NotFoundPage() {
  const { data: events, isFetching } = useFetchEvents();
  const navigate = useNavigate();
  const previousPathName = useSelector(pathNameSelector);
  return (
    <>
      <Header showSearchBox={false} />
      <div className="notfound-container">
        <h1>Nội dung không tồn tại hoặc đã bị xóa?</h1>
        <img src={NotFoundImage} alt="Page Not Found" />
        {isFetching ? null : <SearchBox data={events?.data} />}

        <button onClick={() => navigate(previousPathName)}>
          Trở về trang trước đó
        </button>
      </div>
      <Footer />
    </>
  );
}

export default NotFoundPage;
