import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
      children: [{ path: "login", element: <LoginPage /> }],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
