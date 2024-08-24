import { faClock } from "@fortawesome/free-regular-svg-icons";
import {
  faCalendarDays,
  faCircleExclamation,
  faCircleMinus,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import DeleteModel from "./deleteModel";
import { useSearchParams } from "react-router-dom";
import { schedule } from "./utils/schemas";
import Update from "./update";
import AddupdateSchedule from "./addupdateSchedule";
import SnoozedButton from "./snoozedButton";

const url = import.meta.env.VITE_BACKEND_URL;

function Showschedules() {
  const [schedules, setSchedules] = useState<schedule>();
  const [deleteModelVisible, setdeleteModelVisible] = useState<boolean>(false);
  const [updateVisible, setupdateVisible] = useState<boolean>(false);
  const [star, setstar] = useState<boolean>(false);
  const toggleupdateVisible = () => setupdateVisible(!updateVisible);
  const toggleStar = () => setstar(!star);
  const [search] = useSearchParams();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(`${url}scheduleID?${search}`);
        const data = await response.json();
        console.log(data);
        setSchedules(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchdata();
  }, [search]);
  const toggledeleteModelVisible = () =>
    setdeleteModelVisible(!deleteModelVisible);
  return (
    <div className="w-full text-left font-semibold max-sm:border-t-2 max-sm:py-4 max-sm:my-3">
      <div className="w-full flex justify-between">
        <p className="text-2xl mb-7 font-bold">{schedules?.title}</p>
        <div className="flex space-x-4">
          <SnoozedButton issnoozed={schedules?.isSnoozed as boolean} />
          <FontAwesomeIcon
            onClick={toggledeleteModelVisible}
            className="hover:cursor-pointer"
            icon={faCircleMinus}
            color="red"
          />
          <FontAwesomeIcon
            icon={faStar}
            color={schedules?.star ? "yellow" : "gray"}
            className="hover:cursor-pointer"
            onClick={toggleStar}
          />
        </div>
      </div>
      <div className="flex space-x-3 mb-3 items-center ">
        <FontAwesomeIcon
          icon={faCircleExclamation}
          style={{ color: "#303031" }}
        />
        <p className="text-gray-500">{schedules?.description}</p>
      </div>
      <div className="flex space-x-3 text-gray-700 text-sm  mb-3 items-center">
        <FontAwesomeIcon icon={faClock} style={{ color: "#303031" }} />
        <p>{schedules?.time}</p>
      </div>
      <div className="flex space-x-3 text-gray-700 items-center">
        <FontAwesomeIcon icon={faCalendarDays} style={{ color: "#303031" }} />
        <p>{schedules?.time_Stamp}</p>
      </div>
      <div className="w-full flex space-x-5 justify-end">
        <button
          onClick={toggleupdateVisible}
          className="bg-sky-400 hover:bg-sky-500 active:bg-sky-300 text-white font-bold py-2 px-4 rounded-md"
        >
          Update
        </button>
      </div>
      <DeleteModel
        visible={deleteModelVisible}
        togglevisible={toggledeleteModelVisible}
      />
      <Update visible={star} togglevisible={toggleStar} />
      <AddupdateSchedule
        user_schedule={schedules}
        visible={updateVisible}
        togglevisible={toggleupdateVisible}
        update={true}
      />
    </div>
  );
}

export default Showschedules;
