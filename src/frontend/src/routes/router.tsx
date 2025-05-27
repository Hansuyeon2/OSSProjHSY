import { createBrowserRouter } from "react-router-dom";

//layouts
import DefaultLayout from "@layouts/DefaultLayout";
import LoginLayout from "@layouts/GuestLayout";

import LoginPage from "@pages/Login/Login";
import Signup from "@pages/Login/Signup";
import Mainpage from "@pages/Main/Mainpage";
import Diary from "@pages/Diary/Diary";
import TodayReport from "@pages/TodayReport/TodayReport";
import MonthListPage from "@pages/MonthReport/MonthListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        element: <LoginLayout />,
        children: [
          { path: "signup", element: <Signup /> },
          { path: "/", element: <LoginPage /> },
        ],
      },
      {
        children: [
          { path: "main", element: <Mainpage /> },
          { path: "diary", element: <Diary /> },
          { path: "todayReport", element: <TodayReport /> },
          { path: "monthList", element: <MonthListPage /> },
        ],
      },
    ],
  },
]);

export default router;
