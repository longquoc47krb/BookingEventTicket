import { Pagination } from "antd";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { useFetchEventsByFilter } from "../../../api/services/eventServices";
import SectionTitle from "../../../components/common/section-title";
import EmptyData from "../../../components/empty";
import Event from "../../../components/event";
import EventFilter from "../../../components/filter";
import { filterSelector } from "../../../redux/slices/filterSlice";
import { filterData, isEmpty, isNotEmpty } from "../../../utils/utils";

function FilterEventFragment(props) {
  const filter = useSelector(filterSelector);

  const [currentPage, setCurrentPage] = useState(0);
  const { data: filteredEvents, status: filteredEventsStatus } =
    useFetchEventsByFilter(filter);

  console.log({ filteredEvents });
  // Change page
  const onChange = (page) => {
    setCurrentPage(page - 1);
  };
  // if filter change, set current page equal 0 ( page 1)
  useEffect(() => {
    setCurrentPage(0);
  }, [filter]);
  const firstIndex = currentPage * 6;
  const lastIndex = (currentPage + 1) * 6;
  return (
    <>
      <div className="event-container">
        <SectionTitle>{t("event.list")}</SectionTitle>
        <EventFilter />
        <div className="event-container-grid">
          {filteredEventsStatus === "loading" ? (
            [...Array(6)].map((i) => (
              <Skeleton width={"30vw"} height={260} key={i} />
            ))
          ) : isEmpty(filteredEvents) ? (
            <EmptyData />
          ) : isNotEmpty(filterData) ? (
            filteredEvents
              .slice(firstIndex, lastIndex)
              .map((event) => <Event event={event} key={event?.id} />)
          ) : (
            <EmptyData />
          )}
        </div>
      </div>
      <div className="event-pagination">
        {!filteredEvents ? null : filteredEvents.length > 0 ? (
          <Pagination
            current={currentPage + 1}
            onChange={onChange}
            total={filteredEvents.length}
            pageSize={6}
            defaultCurrent={1}
          />
        ) : null}
      </div>
    </>
  );
}

export default FilterEventFragment;
