import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import BuilderPage from "../pages/BuilderPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/builder",
    element: <BuilderPage />,
  },
]);
