import { createBrowserRouter } from "react-router-dom";

//layouts
import DefaultLayout from "@layouts/DefaultLayout";
import LoginLayout from "@layouts/GuestLayout";

import LoginPage from "@pages/Login/Login";
import Signup from "@pages/Login/Signup";
import Mainpage from "@pages/Main/Mainpage";
import Diary from "@pages/Diary/Diary";
import TodayReport from "@pages/TodayReport/TodayReport";
import MonthListPage from "@pages/MonthList/MonthListPage";
import PrivateRoute from "@layouts/PrivateLayout";
import MonthReportPage from "@pages/MonthReport/MonthReportPage";

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
        element: <PrivateRoute />,
        children: [
          { path: "main", element: <Mainpage /> },
          { path: "diary", element: <Diary /> },
          { path: "todayReport/:id", element: <TodayReport /> },
          { path: "monthList", element: <MonthListPage /> },
          { path: "monthReport", element: <MonthReportPage /> },
        ],
      },
    ],
  },
]);

export default router;
