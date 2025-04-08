import { createBrowserRouter } from "react-router-dom";

//layouts
import DefaultLayout from "@layouts/DefaultLayout";
import LoginLayout from "@layouts/GuestLayout";
import LoginPage from "@pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        element: <LoginLayout />,
        children: [
          // {path: "signup", element: <SignupPage />},
          { path: "login", element: <LoginPage /> },
        ],
      },
      {
        children: [
          //  페이지 추가
        ],
      },
    ],
  },
]);

export default router;
