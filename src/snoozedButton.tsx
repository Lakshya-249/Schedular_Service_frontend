import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const url = import.meta.env.VITE_BACKEND_URL;

function SnoozedButton({ issnoozed }: { issnoozed: boolean }) {
  //   console.log(issnoozed);
  const [button, setbutton] = useState<boolean>(issnoozed);
  console.log(button);

  useEffect(() => {
    setbutton(issnoozed);
  }, [issnoozed]);

  const [search] = useSearchParams();
  const toggleButton = async () => {
    setbutton(!button);
    const response = await fetch(`${url}setsnooze?${search}&isSnz=${!button}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };
  return (
    <div>
      <div
        onClick={toggleButton}
        className={`w-[2.7rem] flex ${
          !button ? "justify-start bg-gray-200" : "justify-end bg-sky-400"
        } rounded-full p-1 hover:cursor-pointer`}
      >
        <div className="w-[1rem] h-[1rem] rounded-full bg-white"></div>
      </div>
    </div>
  );
}

export default SnoozedButton;
