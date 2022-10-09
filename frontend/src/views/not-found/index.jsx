import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFetchEvents } from "../../api/services/eventServices";
import NotFoundImage from "../../assets/404.svg";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import SearchBox from "../../components/common/searchbox";
import { pathNameSelector } from "../../redux/slices/routeSlice";
function NotFoundPage() {
  const { data: events, isFetching } = useFetchEvents();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const previousPathName = useSelector(pathNameSelector);

  return (
    <>
      <Header showSearchBox={false} />
      <div className="notfound-container">
        <h1>{t("404.title")}</h1>
        <img src={NotFoundImage} alt="Page Not Found" />
        {isFetching ? null : (
          <SearchBox
            data={events?.data}
            placeholder={t("event.placeholder-searchbox")}
          />
        )}

        <button onClick={() => navigate(previousPathName)}>
          {t("404.go-back")}
        </button>
      </div>
      <Footer />
    </>
  );
}

export default NotFoundPage;
