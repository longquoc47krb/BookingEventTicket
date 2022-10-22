import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { useLocationName } from "../../api/services/generalServices";
import constants from "../../utils/constants";
const { provinceMapping } = constants;
function Location() {
  const { data: location, status } = useLocationName();
  if (status === "loading") {
    return null;
  } else if (status === "error") {
    return <span>Error</span>;
  } else {
    return (
      <div className="flex items-center">
        <IoLocationSharp fontSize={30} />
        <span className="text-white font-semibold">
          {location ? `${provinceMapping.get(location.region)}` : null}
        </span>
      </div>
    );
  }
}

export default Location;
