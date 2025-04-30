import { createBrowserRouter } from "react-router-dom";

//layouts
import DefaultLayout from "@layouts/DefaultLayout";
import LoginLayout from "@layouts/GuestLayout";

import LoginPage from "@pages/Login/Login";
import Signup from "@pages/Login/Signup";
import Mainpage from "@pages/Main/Mainpage";

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
        children: [{ path: "main", element: <Mainpage /> }],
      },
    ],
  },
]);

export default router;
