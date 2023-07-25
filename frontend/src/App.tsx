import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

import AddConsumerForm from "./components/forms/AddConsumerForm";
import AddBillFormPage, {
  loader as addBillLoader,
} from "./pages/AddBillFormPage";
import BillDetailsPage from "./pages/BillDetailsPage";
import BillGenerate from "./pages/BillGeneratePage";
import BillingPage from "./pages/BillingPage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryDetailsPage from "./pages/CategoryDetailsPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import ItemsPage from "./pages/ItemsPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import Profile from "./pages/Profile";
import Protect from "./pages/Protect";
import type { RootState } from "./redux";
import { ADMIN, BILLER, INVENTORY_MANAGER } from "./utils/constants";
import { useAppSelector } from "./utils/hooks/useAppSelector";

const App = () => {
  const user = useAppSelector((state: RootState) => state.user);
  const isAdmin: boolean = user.token !== undefined && user.role === ADMIN;
  const isInventoryManager: boolean =
    user.token !== undefined && user.role === INVENTORY_MANAGER;
  const isBiller: boolean = user.token !== undefined && user.role === BILLER;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
      children: [
        {
          path: "billing",
          children: [
            {
              index: true,
              element: (
                <Protect
                  element={<BillingPage />}
                  isAuth={isAdmin || isBiller}
                />
              ),
            },
            {
              path: ":billId",
              element: (
                <Protect
                  element={<BillDetailsPage />}
                  isAuth={isAdmin || isBiller}
                />
              ),
            },
            {
              path: "new-bill",
              children: [
                {
                  index: true,
                  element: (
                    <Protect
                      element={<AddBillFormPage />}
                      isAuth={isAdmin || isBiller}
                    />
                  ),
                  loader: addBillLoader,
                },
                {
                  path: "generate-bill",
                  element: (
                    <Protect
                      element={<BillGenerate />}
                      isAuth={isAdmin || isBiller}
                    />
                  ),
                },
              ],
            },
            {
              path: "consumer",
              element: <AddConsumerForm />,
            },
          ],
        },
        {
          path: "items",
          children: [
            { index: true, element: <ItemsPage /> },
            {
              path: ":itemId",
              element: <ItemDetailsPage />,
            },
          ],
        },
        {
          path: "categories",
          children: [
            { index: true, element: <CategoriesPage /> },
            { path: ":categoryId", element: <CategoryDetailsPage /> },
          ],
        },
        {
          path: "profile",
          element: (
            <Protect
              element={<Profile />}
              isAuth={isAdmin || isBiller || isInventoryManager}
            />
          ),
        },
        { path: "bill-form", element: <AddConsumerForm /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    { path: "logout", element: <Navigate to="/login" /> },
  ]);

  return (
    <>
      <ToastContainer
        autoClose={false}
        theme="colored"
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
