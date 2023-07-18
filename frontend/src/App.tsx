import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

import AddBillFormPage from "./pages/AddBillFormPage";
import BillDetailsPage from "./pages/BillDetailsPage";
import BillingPage from "./pages/BillingPage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryDetailsPage from "./pages/CategoryDetailsPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import ItemsPage from "./pages/ItemsPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import Profile from "./pages/Profile";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
      children: [
        {
          path: "billing",
          children: [
            { index: true, element: <BillingPage /> },
            {
              path: ":billId",
              element: <BillDetailsPage />,
            },
            {
              path: "new-bill",
              element: <AddBillFormPage />,
            },
          ],
        },
        {
          path: "items",
          children: [
            { index: true, element: <ItemsPage /> },
            { path: ":itemId", element: <ItemDetailsPage /> },
          ],
        },
        {
          path: "categories",
          children: [
            { index: true, element: <CategoriesPage /> },
            { path: ":categoryId", element: <CategoryDetailsPage /> },
          ],
        },
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
        autoClose={false}
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
