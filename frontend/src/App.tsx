import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import Profile from "./pages/Profile"

const App = () => {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
      children: [{ path: "login", element: <LoginPage /> }
                ,{ path: "profile", element: <Profile /> }],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
