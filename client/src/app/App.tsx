import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Toaster } from "sonner";
import "./App.css";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </>
  );
};

export default App;
