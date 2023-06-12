import "./styles/global.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import DetailPage, { loader as estateDetailLoader } from "./pages/DetailPage";
import AdminPage, { action as manipulateEstateAction } from "./pages/AdminPage";
import Dashboard from "./components/adminPage/Dashboard";
import AdminEstates from "./pages/AdminEstates";
import NewEstate from "./components/adminPage/NewEstate";
import EditState from "./components/adminPage/EditEstate";
import ManagementPage from "./pages/ManagementPage";

const router = createBrowserRouter([
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: ":estateId",
    children: [
      {
        index: true,
        element: <DetailPage />,
        // id: 'estate-detail',
        // loader: estateDetailLoader,
      },
    ],
  },
  {
    path: "admin",
    element: <AdminPage />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "estates",
        // element: <Estates />,
        children: [
          { index: true, element: <AdminEstates /> },
          {
            path: "new",
            element: <NewEstate />,
            // action: manipulateEstateAction,
          },
          {
            path: ":estateId",
            element: <EditState />,
            id: "estate-detail",
            loader: estateDetailLoader,
            // action: manipulateEstateAction,
          },
        ],
      },
      {
        path: "management",
        element: <ManagementPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
