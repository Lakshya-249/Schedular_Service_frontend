import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getdetails } from "./utils/factory";
import { schedule, week } from "./utils/schemas";
import { useNavigate, useSearchParams } from "react-router-dom";
import { months } from "./calender";

const url = import.meta.env.VITE_BACKEND_URL;

function AddupdateSchedule({
  visible,
  togglevisible,
  user_schedule,
  update,
}: {
  visible: boolean;
  togglevisible: () => void;
  user_schedule: schedule | undefined;
  update: boolean;
}) {
  if (!visible) return;
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [star, setstar] = useState<boolean>(false);
  const [schedule, setschedule] = useState<schedule>({
    title: user_schedule ? (user_schedule as schedule).title : "",
    description: user_schedule ? (user_schedule as schedule).description : "",
    time_Stamp: user_schedule ? (user_schedule as schedule).time_Stamp : "",
    time: user_schedule ? (user_schedule as schedule).time : "",
    date_s: [],
    user_id: "",
    star: user_schedule ? (user_schedule as schedule).star : false,
    isReccuring: user_schedule
      ? (user_schedule as schedule).isReccuring
      : false,
    isSnoozed: user_schedule ? (user_schedule as schedule).isSnoozed : false,
    frequency: "daily",
    days: [],
    dates: [],
    months: [],
  });
  const removeDate = (index: any, val: string) => {
    if (val === "days") {
      setschedule({
        ...schedule,
        ["days"]: schedule.days.filter((sch) => sch !== index),
      });
      return;
    }
    if (val === "months") {
      setschedule({
        ...schedule,
        ["months"]: schedule.months.filter((sch) => sch !== index),
      });
      return;
    }
    if (val === "dates") {
      setschedule({
        ...schedule,
        ["dates"]: schedule.dates.filter((sch) => sch !== index),
      });
      return;
    }
    if (val === "date_s") {
      setschedule({
        ...schedule,
        [val]: schedule.date_s.filter((sch) => sch !== index),
      });
    }
  };
  useEffect(() => {
    setschedule({ ...schedule, ["user_id"]: getdetails("id") || "" });
  }, []);

  const addSchedule = (val: string, e: any) => {
    if (val === "date_s") {
      setschedule({
        ...schedule,
        ["date_s"]: [
          ...schedule.date_s.filter((sch) => sch !== e.target.value),
          e.target.value,
        ],
      });

      return;
    } else if (val === "isReccuring") {
      setschedule({
        ...schedule,
        ["isReccuring"]: !schedule.isReccuring,
      });
      console.log(schedule);
      return;
    } else if (val === "days") {
      setschedule({
        ...schedule,
        ["days"]: [
          ...schedule.days.filter((sch) => sch !== parseInt(e.target.value)),
          parseInt(e.target.value),
        ],
      });
      console.log(schedule);
      return;
    } else if (val === "dates") {
      setschedule({
        ...schedule,
        ["dates"]: [
          ...schedule.dates.filter((sch) => sch !== parseInt(e.target.value)),
          parseInt(e.target.value),
        ],
      });
      console.log(schedule);
      return;
    } else if (val === "months") {
      setschedule({
        ...schedule,
        ["months"]: [
          ...schedule.months.filter((sch) => sch !== parseInt(e.target.value)),
          parseInt(e.target.value),
        ],
      });
      console.log(schedule);
      return;
    } else {
      setschedule({ ...schedule, [val]: e.target.value });
      console.log(schedule);
    }
  };

  const handleClick = async () => {
    const newSchedule: schedule = schedule;
    setschedule({
      title: "",
      description: "",
      time_Stamp: "",
      date_s: [],
      time: "",
      user_id: "",
      star: false,
      isReccuring: false,
      isSnoozed: false,
      frequency: "daily",
      days: [],
      dates: [],
      months: [],
    });
    const response = await fetch(`${url}schedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSchedule),
    });
    const data = await response.json();
    console.log(data);
    navigate("/allschedules");
  };
  const handleUpdate = async () => {
    await fetch(`${url}schedule`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: search.get("id") || "",
        title: schedule.title,
        description: schedule.description,
        date_s: schedule.date_s,
        time_Stamp: schedule.time_Stamp,
        time: schedule.time,
        user_id: schedule.user_id,
        star: schedule.star,
        frequency: schedule.frequency,
        isReccuring: schedule.isReccuring,
        days: schedule.days,
        dates: schedule.dates,
        months: schedule.months,
      }),
    });
    navigate("/allschedules");
  };
  // console.log(schedule.date_s);

  const toggleStar = () => {
    setstar(!star);
    setschedule({ ...schedule, ["star"]: !star });
  };
  return (
    <div className="fixed inset-0 p-1.5 flex justify-center items-center backdrop-brightness-50">
      <div
        className="w-[30rem] rounded-xl max-sm:p-5 max-sm:w-full font-semibold
     bg-white flex flex-col space-y-4 shadow-xl p-9"
      >
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold text-left">Add/Update Schedule</p>
          <FontAwesomeIcon
            icon={faStar}
            color={schedule.star ? "yellow" : "gray"}
            onClick={toggleStar}
          />
        </div>
        <input
          className="resize-none p-3 outline-none bg-slate-100 rounded-xl"
          type="text"
          placeholder="Title"
          onChange={(e) => addSchedule("title", e)}
          value={schedule?.title}
        />
        <textarea
          className="resize-none p-3.5 outline-none bg-slate-100 rounded-xl"
          placeholder="Description"
          onChange={(e) => addSchedule("description", e)}
          value={schedule?.description}
        />
        <div className="flex justify-between px-2 text-sm font-semibold">
          <div className="space-x-3 ">
            {schedule?.isReccuring ? (
              <input
                type="checkbox"
                onClick={(e) => addSchedule("isReccuring", e)}
                id="recurr"
                checked
              />
            ) : (
              <input
                type="checkbox"
                onClick={(e) => addSchedule("isReccuring", e)}
                id="recurr"
              />
            )}
            <label htmlFor="recurr">Is Recurring</label>
          </div>
          <input
            type="time"
            placeholder="Time"
            className="outline-none"
            value={schedule.time}
            onChange={(e) => addSchedule("time", e)}
          />
        </div>
        {!schedule.isReccuring ? (
          <div className="w-full flex flex-col bg-slate-50 justify-start rounded-2xl p-0.5">
            <div
              className="flex flex-wrap p-1.5 text-xs *:m-1 *:rounded-full *:border *:border-sky-100 
              *:bg-sky-50 *:px-2 *:py-0.5 dark:text-sky-300 dark:*:border-sky-500/15 dark:*:bg-sky-500/10"
            >
              {schedule.date_s?.map((d, i) => (
                <div
                  onClick={() => removeDate(d, "date_s")}
                  className="hover:cursor-pointer"
                  key={i}
                >
                  {d}
                </div>
              ))}
            </div>
            <input
              type="date"
              min={today}
              className="bg-inherit p-2 outline-none "
              placeholder="Date"
              onChange={(e) => {
                addSchedule("date_s", e);
                // addDate(e.target.value);
              }}
              // value={schedule?.time_Stamp.split("T")[0]}
            />
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex space-x-5">
              {schedule.frequency === "monthly" ||
              schedule.frequency === "yearly" ? (
                <div className="resize-none w-full flex flex-col px-1.5 pb-2 bg-slate-100 rounded-xl">
                  <div
                    className="flex flex-wrap p-1.5 text-xs *:m-1 *:rounded-full *:border *:border-sky-100 
              *:bg-sky-50 *:px-2 *:py-0.5 dark:text-sky-300 dark:*:border-sky-500/15 dark:*:bg-sky-500/10"
                  >
                    {schedule.dates?.map((date, i) => (
                      <div
                        className="hover:cursor-pointer"
                        onClick={() => removeDate(date, "dates")}
                        key={i}
                      >
                        {date}
                      </div>
                    ))}
                  </div>
                  <select
                    onChange={(e) => addSchedule("dates", e)}
                    className="bg-inherit text-gray-500 outline-none"
                  >
                    {[...Array(31)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                ""
              )}
              {schedule.frequency === "weekly" ? (
                <div className="resize-none w-full flex flex-col px-1.5 pb-2 bg-slate-100 rounded-xl">
                  <div
                    className="flex flex-wrap p-1.5 text-xs *:m-1 *:rounded-full *:border *:border-sky-100 
              *:bg-sky-50 *:px-2 *:py-0.5 dark:text-sky-300 dark:*:border-sky-500/15 dark:*:bg-sky-500/10"
                  >
                    {schedule.days?.map((day, i) => (
                      <div onClick={() => removeDate(day, "days")} key={i}>
                        {week[day]}
                      </div>
                    ))}
                  </div>
                  <select
                    onChange={(e) => addSchedule("days", e)}
                    className="bg-inherit text-gray-500 outline-none"
                  >
                    {week.map((day, i) => (
                      <option key={i} value={i}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                ""
              )}

              <select
                onChange={(e) => addSchedule("frequency", e)}
                className="resize-none p-3 h-12 text-gray-500 outline-none bg-slate-100 rounded-xl"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            {schedule.frequency === "yearly" ? (
              <div className="resize-none w-full flex flex-col px-1.5 pb-2 bg-slate-100 rounded-xl">
                <div
                  className="flex flex-wrap p-1.5 text-xs *:m-1 *:rounded-full *:border *:border-sky-100 
              *:bg-sky-50 *:px-2 *:py-0.5 dark:text-sky-300 dark:*:border-sky-500/15 dark:*:bg-sky-500/10"
                >
                  {schedule.months?.map((month, i) => (
                    <div onClick={() => removeDate(month, "months")} key={i}>
                      {months[month - 1]}
                    </div>
                  ))}
                </div>
                <select
                  onChange={(e) => addSchedule("months", e)}
                  className="bg-inherit text-gray-500 outline-none"
                >
                  {months.map((month, i) => (
                    <option key={i} value={i + 1}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
        {update ? (
          <button
            onClick={handleUpdate}
            className="w-full rounded-xl hover:shadow-lg active:shadow-sm border-[1px] py-1 border-black"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleClick}
            className="w-full rounded-xl hover:shadow-lg active:shadow-sm border-[1px] py-1 border-black"
          >
            Save
          </button>
        )}

        <button
          onClick={togglevisible}
          className="w-full text-white rounded-xl border-[1px] py-1.5 bg-black"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddupdateSchedule;
