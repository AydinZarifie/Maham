import { RouterProvider, createBrowserRouter } from "react-router-dom";

import DetailPage, { loader as estateDetailLoader } from "./pages/DetailPage";
import AdminPage from "./pages/admin/AdminPage";
import Dashboard from "./components/adminPage/Dashboard";
import AdminEstates from "./pages/admin/AdminEstates";
import NewEstate from "./components/adminPage/NewEstate";
import EditState from "./components/adminPage/EditEstate";
import ManagementPage from "./pages/admin/ManagementPage";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/admin/SigninPage";
import AdminPanel from "./pages/admin/AdminPanel";
import AdminList from "./components/adminPage/adminPanel/AdminList";
import AddAdmin from "./components/adminPage/adminPanel/AddAdmin";
import LockPosition from "./components/adminPage/AdminEstate/LockPosition";
import SellPosition from "./components/adminPage/AdminEstate/SellPosition";
import GetDocuments from "./components/adminPage/AdminEstate/GetDocuments";
import Estates from "./components/adminPage/AdminEstate/Estates";
import { action as logoutAction } from "./pages/admin/Logout";

import { checkAuthLoader } from "./util/auth";

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
    loader: checkAuthLoader,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "estates",
        children: [
          {
            path: "",
            element: <AdminEstates />,
            children: [
              { index: true, element: <Estates /> },
              { path: "LockPosition", element: <LockPosition /> },
              { path: "SellPosition", element: <SellPosition /> },
              { path: "GetDocuments", element: <GetDocuments /> },
            ],
          },
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
      {
        path: "admins",
        element: <AdminPanel />,
        children: [
          { index: true, element: <AdminList /> },
          {
            path: "addAdmin",
            element: <AddAdmin />,
          },
        ],
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
  {
    path: "loginAdmin",
    element: <SigninPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
