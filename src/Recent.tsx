import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { schedule2 } from "./utils/schemas";
import { getdetails } from "./utils/factory";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_BACKEND_URL;

function Recent() {
  const [schedules, setSchedules] = useState<schedule2[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch(`${url}recentschedules/${getdetails("id")}`);
      const data = await response.json();
      if (response.status >= 400) return;
      setSchedules(data);
    };
    fetchdata();
  }, []);

  const handleClick = (id: string) => {
    navigate(`/schedule?id=${id}`);
  };
  return (
    <div className="w-full space-y-5 py-2">
      <p className="text-2xl max-sm:text-xl px-2 text-sky-300 font-semibold">
        Recently Added
      </p>
      <div className="space-y-5 example">
        {schedules.map((val, i) => (
          <div
            onClick={() => handleClick(val.id)}
            key={i}
            className="w-full h-[3.5rem] hover:cursor-pointer flex shadow-md px-5 items-center justify-between"
          >
            <div className="space-x-4 flex items-center">
              <FontAwesomeIcon icon={faCircleCheck} color="green" />
              <p>{val.title}</p>
            </div>
            <p className="text-sm text-gray-600">{val.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recent;
