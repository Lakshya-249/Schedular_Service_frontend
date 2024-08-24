import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getdetails } from "./utils/factory";

export const months: Array<string> = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Calender() {
  const navigate = useNavigate();
  const ndate = new Date();
  const currentMonth = ndate.getMonth();
  const currentYear = ndate.getFullYear();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const todayDate = new Date().getDate() - 1;
  const todayMonth = new Date().getMonth();
  type date = {
    month: number;
    year: number;
    day: number;
    date: number;
  };
  const [fulldate, setfulldate] = useState<date>({
    month: currentMonth,
    year: currentYear,
    day: firstDayOfMonth,
    date: new Date(currentYear, currentMonth + 1, 0).getDate(),
  });

  const handleIncreamentDate = () => {
    const newmonth = fulldate.month + 1;
    if (newmonth > 11) {
      const sdate = new Date(fulldate.year + 1, 0, 1);
      setfulldate({
        month: 0,
        year: fulldate.year + 1,
        day: sdate.getDay(),
        date: new Date(fulldate.year + 1, 1, 0).getDate(),
      });
      return;
    }
    const newDate = new Date(fulldate.year, fulldate.month + 1, 1);
    setfulldate({
      month: newDate.getMonth(),
      year: newDate.getFullYear(),
      day: newDate.getDay(),
      date: new Date(
        newDate.getFullYear(),
        newDate.getMonth() + 1,
        0
      ).getDate(),
    });
  };
  const handleDecrementDate = () => {
    if (fulldate.month === todayMonth) return;
    const newmonth = fulldate.month - 1;
    if (newmonth < 0) {
      const sdate = new Date(fulldate.year - 1, 11, 0);
      setfulldate({
        month: 11,
        year: fulldate.year - 1,
        day: sdate.getDay(),
        date: new Date(fulldate.year - 1, 1, 0).getDate(),
      });
      return;
    }
    const newDate = new Date(fulldate.year, fulldate.month - 1, 1);
    setfulldate({
      month: newDate.getMonth(),
      year: newDate.getFullYear(),
      day: newDate.getDay(),
      date: new Date(
        newDate.getFullYear(),
        newDate.getMonth() + 1,
        0
      ).getDate(),
    });
  };

  const handleClick = (i: number) => {
    // console.log(fulldate);
    const fullDate = `${i + 1 < 10 ? "0" + (i + 1) : i + 1}-${
      fulldate.month < 10 ? "0" + (fulldate.month + 1) : fulldate.month + 1
    }-${fulldate.year}`;
    console.log(fullDate);

    navigate(`/allschedules?date=${fullDate}&id=${getdetails("id")}`);
  };

  const win = window.matchMedia("{max-width:600px}");
  console.log(win.matches);

  const days: Array<string> = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return (
    <div className="w-full space-y-3">
      <div className="w-full p-5 flex justify-between items-center">
        <div className="flex text-2xl max-sm:text-xl space-x-3 max-sm:space-x-2">
          <p className="font-semibold">{months[fulldate.month]}</p>
          <p>{fulldate.year}</p>
        </div>
        <div className="flex space-x-10 max-sm:space-x-4">
          <FontAwesomeIcon
            icon={faChevronLeft}
            onClick={handleDecrementDate}
            color="gray"
            className="hover:cursor-pointer hover:scale-125 active:scale-95"
          />
          <FontAwesomeIcon
            icon={faChevronRight}
            onClick={handleIncreamentDate}
            color="gray"
            className="hover:cursor-pointer hover:scale-125 active:scale-95"
          />
        </div>
      </div>
      <div className="max-sm:overflow-auto px-7 max-sm:px-2">
        <div className="grid grid-cols-7 text-xl max-sm:text-sm gap-3 font-semibold text-gray-700">
          {days.map((day, i) => (
            <div key={i} className="h-[4rem] max-sm:h-[2rem] rounded-xl">
              {win.matches ? day[0] : day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-4 max-sm:text-sm font-medium">
          {[...Array(fulldate.day)].map((_, i) => (
            <div key={i} className="h-[5rem] max-sm:h-[2rem]"></div>
          ))}
          {[...Array(todayMonth === fulldate.month ? todayDate : 0)].map(
            (_, i) => (
              <div
                key={i}
                className="flex justify-center items-center h-[5rem] text-gray-500 text-xl max-sm:h-[2rem]"
              >
                {i + 1}
              </div>
            )
          )}
          {[
            ...Array(
              todayMonth === fulldate.month
                ? fulldate.date - todayDate
                : fulldate.date
            ),
          ].map((_, i) => (
            <div
              key={i}
              onClick={() =>
                handleClick(todayMonth === fulldate.month ? todayDate + i : i)
              }
              className="flex justify-center items-center h-[5rem] max-sm:h-[2rem] bg-gradient-to-br
            hover:shadow-md active:shadow-sm rounded-xl text-xl hover:cursor-pointer 
            from-white to-sky-50 max-sm:bg-none"
            >
              {todayMonth === fulldate.month ? todayDate + i + 1 : i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calender;
