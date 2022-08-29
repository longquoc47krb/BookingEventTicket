import React, { useEffect, useState } from "react";
import Header from "../../components/common/header";
import Event from "../../components/event";
import HeroBanner from "../../components/hero";
import httpRequest from "../../services/httpRequest";

function EventDashBoard() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await httpRequest({
        url: "/event",
        method: "GET",
      });
      setData(res);
      console.log(res);
    };
    fetchData();
  }, []);
  console.log(data);
  return (
    <>
      <Header />
      <HeroBanner />
      <div className='w-[100vw] px-3 bg-red-500 h-[100vh] grid-cols-3 grid'>
        {data?.map((item, index) => (
          <Event event={item} />
        ))}
      </div>
    </>
  );
}

export default EventDashBoard;
