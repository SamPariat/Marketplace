import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import BillingPage from "./pages/BillingPage";
import CategoriesPage from "./pages/CategoriesPage";
import ItemsPage from "./pages/ItemsPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

import "react-toastify/dist/ReactToastify.min.css";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
      children: [
        { path: "billing", element: <BillingPage /> },
        { path: "items", element: <ItemsPage /> },
        { path: "categories", element: <CategoriesPage /> },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />;
    </>
  );
};

export default App;
