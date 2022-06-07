import { useRoutes } from "react-router-dom";
import Signin from "../pages/Signin";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Verification from "../pages/Verification";
import AddQuestion from "../pages/AddQuestion";

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
  ]);

  return routes;
}
