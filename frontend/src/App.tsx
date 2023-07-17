import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import BillingPage from "./pages/BillingPage";
import CategoriesPage from "./pages/CategoriesPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import ItemsPage from "./pages/ItemsPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import Profile from "./pages/Profile";

import "react-toastify/dist/ReactToastify.min.css";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
      children: [
        { path: "billing", element: <BillingPage /> },
        {
          path: "items",
          children: [
            { index: true, element: <ItemsPage /> },
            { path: ":itemId", element: <ItemDetailsPage /> },
          ],
        },
        { path: "categories", element: <CategoriesPage /> },
        { path: "profile", element: <Profile /> },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);

  return (
    <>
      <ToastContainer
        autoClose={2000}
        theme={
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
        }
        draggable
        pauseOnHover={false}
        bodyStyle={{
          fontFamily: "Exo",
        }}
        limit={3}
      />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
