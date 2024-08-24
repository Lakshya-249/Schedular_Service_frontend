import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Allschedules from "./allschedules.tsx";
import Showschedules from "./showschedules.tsx";
import Recent from "./Recent.tsx";
import ImportantSchedules from "./importantSchedules.tsx";
import SnoozedSchedules from "./snoozedSchedules.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Recent />,
      },
      {
        path: "importantschedules",
        element: <ImportantSchedules />,
      },
      {
        path: "allschedules",
        element: <Allschedules />,
      },
      {
        path: "schedule",
        element: <Showschedules />,
      },
      {
        path: "snoozedSch",
        element: <SnoozedSchedules />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
