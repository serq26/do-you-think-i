import { useRoutes } from "react-router-dom";
import Signin from "../pages/Signin";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Verification from "../pages/Verification";
import AddQuestion from "../pages/AddQuestion";
import Profile from "../pages/Profile/Profile";
import Questions from "../pages/Profile/Questions";
import Settings from "../pages/Profile/Settings";
import Account from "../pages/Profile/Account";
import EditQuestion from "../pages/Profile/EditQuestion";

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/verification",
      element: <Verification />,
    },
    {
      path: "/add-question",
      element: <AddQuestion />,
    },
    {
      path: "/profile",
      element: <Profile />,
      children: [
        {
          index: true,
          path: "",
          element: <Account />,
        },
        {
          path: "questions",
          element: <Questions />,
        },
        {
          path: "questions/:id",
          element: <EditQuestion />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
      ],
    },
  ]);

  return routes;
}
