import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddupdateSchedule from "./addupdateSchedule";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getdetails } from "./utils/factory";

function Header() {
  const navigate = useNavigate(); // Replace with your actual navigation hook
  const [visible, setvisible] = useState<boolean>(false);
  const settogglevisible = () => {
    setvisible(!visible);
  };
  const fulldate = new Date();
  const date: string = `${fulldate.getDate()}-${
    fulldate.getMonth() + 1
  }-${fulldate.getFullYear()}`;
  return (
    <div className="w-full max-sm:sticky top-0 flex items-center justify-between h-[3rem] px-5 bg-slate-200 shadow-md">
      <div className="relative group">
        <FontAwesomeIcon icon={faBars} color="gray" />
        <div
          className="absolute -left-2 text-gray-500 w-[12rem] hidden group-hover:flex text-left flex-col
         transition ease-in-out delay-150 p-5  rounded-xl space-y-3 bg-white shadow-xl hover:cursor-pointer"
        >
          <p onClick={settogglevisible} className="hover:cursor-pointer">
            Add schedules
          </p>
          <p className="hover:cursor-pointer" onClick={() => navigate("/")}>
            Recents
          </p>
          <p
            className="hover:cursor-pointer"
            onClick={() => navigate("/importantschedules")}
          >
            Important schedules
          </p>
          <p
            className="hover:cursor-pointer"
            onClick={() =>
              navigate(`/allschedules?date=${date}&id=${getdetails("id")}`)
            }
          >
            Today's schedules
          </p>
          <p
            className="hover:cursor-pointer"
            onClick={() => navigate(`/snoozedSch`)}
          >
            Snoozed schedules
          </p>
        </div>
      </div>
      <div className="w-[2rem] h-[2rem] text-xl font-medium justify-center text-white flex items-center  rounded-full bg-black">
        {getdetails("username")[0].toUpperCase()}
      </div>
      <AddupdateSchedule
        user_schedule={undefined}
        togglevisible={settogglevisible}
        visible={visible}
        update={false}
      />
    </div>
  );
}

export default Header;
