/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useFetchCategories } from "../../api/services/categoryServices";
import { useFetchEvents } from "../../api/services/eventServices";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import HelmetHeader from "../../components/helmet";
import HeroBanner from "../../components/hero";
import { setCategoryId } from "../../redux/slices/filterSlice";
import { resultSelector } from "../../redux/slices/searchSlice";
import { isEmpty } from "../../utils/utils";
import FilterEventFragment from "./filterEvent";
import SearchResults from "./searchResults";
function EventDashBoard() {
  const { t } = useTranslation();
  const [categoryParams, setCategoryParams] = useSearchParams();

  const dispatch = useDispatch();
  const searchResults = useSelector(resultSelector);
  const { data: category } = useFetchCategories();
  const categoryId =
    category && categoryParams.get("category")
      ? category.filter((c) => c.name === categoryParams.get("category"))[0].id
      : null;
  const { data: allEvents, status: allEventsStatus } = useFetchEvents();

  useEffect(() => {});

  useEffect(() => {
    dispatch(setCategoryId(categoryId));
  }, []);

  // filter data by date

  return (
    <>
      <HelmetHeader title={t("pages.events")} content="Event Dashboard" />
      <Header showSearchBox={false} />
      <HeroBanner searchData={allEventsStatus === "success" && allEvents} />
      {isEmpty(searchResults) ? <FilterEventFragment /> : <SearchResults />}

      <Footer />
    </>
  );
}
export default EventDashBoard;
