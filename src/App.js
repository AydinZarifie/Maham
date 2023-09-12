import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Assets from "./pages/Assets";
import LendingAndBorrowing from "./pages/LendingAndBorrowing";
import RootLayout from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "assets", element: <Assets /> },
      { path: "lendingandborrowing", element: <LendingAndBorrowing /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
