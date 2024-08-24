import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { schedule3 } from "./utils/schemas";
import { months } from "./calender";

const url = import.meta.env.VITE_BACKEND_URL;

function Allschedules() {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState<schedule3[]>([]);
  const [search] = useSearchParams();
  const currmonth = new Date().getMonth();
  const currdate = new Date().getDate();
  const sdate: Array<string> = search.get("date")?.split("-") || [];
  const monthnum: number = parseInt(sdate[1]) - 1;
  const date: number = parseInt(sdate[0]);
  const fullmonthschedules: string =
    currmonth === monthnum && currdate === date
      ? "Today's schedules"
      : `${months[monthnum]}, ${date} schedules`;

  useEffect(() => {
    const fetchdata = async () => {
      if (!search.size) return;
      // console.log(search);

      const response = await fetch(`${url}schedule?${search}`);
      const data = await response.json();
      setSchedules(data);
      // console.log(data);
    };
    fetchdata();
  }, [search]);
  const handleClick = (val: schedule3) => {
    navigate("/schedule?id=" + val.id);
  };
  return (
    <div className="w-full">
      <p className="text-2xl mb-7 max-sm:my-5 max-sm:border-t-2 max-sm:pt-4 max-sm:text-sky-400 font-bold">
        {fullmonthschedules}
      </p>
      <div className="w-full flex flex-wrap">
        {schedules.map((val, i) => (
          <div
            onClick={() => handleClick(val)}
            key={i}
            className="p-4 h-[3.5rem] m-3 hover:cursor-pointer active:shadow-sm hover:shadow-lg
            flex shadow-md rounded-xl space-x-3 px-5 items-center justify-between"
          >
            <p>{val.title}</p>
            <p className="text-sm text-gray-600">{val.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Allschedules;
