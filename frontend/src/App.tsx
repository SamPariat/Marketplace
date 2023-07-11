import { RouterProvider, createBrowserRouter } from "react-router-dom";
import BillingPage from "./pages/BillingPage";
import CategoriesPage from "./pages/CategoriesPage";
import ItemsPage from "./pages/ItemsPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "billing", element: <BillingPage /> },
        { path: "items", element: <ItemsPage /> },
        { path: "categories", element: <CategoriesPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
