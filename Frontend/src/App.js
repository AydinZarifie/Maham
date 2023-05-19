import "./styles/global.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "./components/HomePage";
import DetailPage, {
  loader as estateDetailLoader,
} from "./components/detailPage/DetailPage";
import AdminPage from "./components/adminPage/AdminPage";
import Dashboard from "./components/adminPage/Dashboard";
import Estates from "./components/adminPage/Estates";
import {action as manipulateEstateAction} from "./components/adminPage/ConfingEstate";
import NewEstate from "./components/adminPage/NewEstate";
import EditState from "./components/adminPage/EditEstate";

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
        id: "estate-detail",
        loader: estateDetailLoader,
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
          { index: true, element: <Estates /> },
          { path: "new", element: <NewEstate />,action:manipulateEstateAction },
          { path: ":estateId", element: <EditState />,action:manipulateEstateAction },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
