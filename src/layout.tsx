import { Outlet } from "react-router-dom";
import Calender from "./calender";
import Header from "./header";
import Schedules from "./schedules";

function Layout() {
  return (
    <div className="w-full h-full">
      <Header />
      <div className="w-full h-full flex">
        <div className="w-[45%] overflow-auto example max-sm:hidden border-r-2 border-gray-200">
          <Schedules />
        </div>
        <div className="w-[55%] max-sm:w-full">
          <Calender />
          <div className="py-5 max-sm:block hidden px-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
