import { useRoutes } from "react-router-dom";
import Signin from "../pages/Signin";
import Home from "../pages/Home";

export default function Router() {
  const routes = useRoutes([
      {
          path: "/",
          element: <Home />
      },
      {
          path: "/signin",
          element: <Signin />
      },
  ]);

  return routes;
}
