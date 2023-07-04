import { RouterProvider, createBrowserRouter } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([]);

  return <RouterProvider router={router} />;
};

export default App;
