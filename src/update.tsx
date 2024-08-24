import { useNavigate, useSearchParams } from "react-router-dom";

const url = import.meta.env.VITE_BACKEND_URL;

function Update({
  visible,
  togglevisible,
}: {
  visible: boolean;
  togglevisible: () => void;
}) {
  if (!visible) return;
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const handleClick = async () => {
    await fetch(`${url}setImportant?${search}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/allschedules");
  };
  return (
    <div className="fixed inset-0 backdrop-brightness-50 font-semibold flex p-3 justify-center items-center">
      <div className="w-[22rem] max-sm:w-full bg-white px-7 py-6 space-y-4 rounded-xl">
        <p className="text-gray-600">
          Do you want to mark/unmark this schedule as important!
        </p>
        <div className="font-semibold text-sm float-right px-1">
          <button
            onClick={togglevisible}
            className="px-4 py-2 rounded-l-md bg-black text-white"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-r-md border-[1px]"
            onClick={handleClick}
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}

export default Update;
