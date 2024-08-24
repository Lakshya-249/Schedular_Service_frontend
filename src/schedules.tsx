import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Outlet } from "react-router-dom";
import { getdetails } from "./utils/factory";

function Schedules() {
  return (
    <div className="w-full space-y-3 font-semibold text-left py-5 px-7">
      <div className="space-y-3 mb-3">
        <div className="w-[2.5rem] h-[2.5rem] flex items-center justify-center rounded-full bg-slate-400"></div>
        <p className="font-normal text-gray-600">{getdetails("username")}</p>
      </div>
      {/* <Showschedules /> */}
      {/* <Allschedules /> */}
      <Outlet />
      <div className="w-full flex flex-col justify-end space-y-3 py-5 border-b-2">
        <div className="flex w-full border-[1px] p-4 justify-between text-gray-500 items-center  rounded-xl">
          <p>Select New schedule from the calander</p>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
    </div>
  );
}

export default Schedules;
