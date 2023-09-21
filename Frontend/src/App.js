import { RouterProvider, createBrowserRouter } from "react-router-dom";

// import DetailPage, { loader as estateDetailLoader } from "./pages/DetailPage";
// import AdminPage from "./pages/admin/AdminPage";
// import Dashboard from "./components/adminPage/Dashboard";
// import AdminEstates from "./pages/admin/AdminEstates";
// import NewEstate from "./components/adminPage/NewEstate";
// import EditState from "./components/adminPage/EditEstate";
// import ManagementPage from "./pages/admin/ManagementPage";
// import HomePage from "./pages/HomePage";
// import SigninPage from "./pages/admin/SigninPage";
// import AdminPanel from "./pages/admin/AdminPanel";
// import AdminList from "./components/adminPage/adminPanel/AdminList";
// import AddAdmin from "./components/adminPage/adminPanel/AddAdmin";
// import LockPosition from "./components/adminPage/AdminEstate/LockPosition";
// import SellPosition from "./components/adminPage/AdminEstate/SellPosition";
// import GetDocuments from "./components/adminPage/AdminEstate/GetDocuments";
// import Estates from "./components/adminPage/AdminEstate/Estates";
import { action as logoutAction } from "./pages/admin/Logout";
import { checkAuthLoader, checkSuperAdminLoader } from "./util/auth";
// import Verification from "./pages/Verification";
// import { loader as adminDetailLoader } from "./components/adminPage/adminPanel/EditAdmin";
// import Profile from "./pages/admin/Profile";
// import UserPanel from "./pages/UserPanel";
// import ManagementAssets from "./components/userPanel/ManagementAssets";
// import Assets from "./components/userPanel/managementAssets/Assets";
// import Transactions from "./components/userPanel/managementAssets/Transactions";
// import ClassicWatchlist from "./pages/userPanel/watchlist/ClassicWatchlist";
// import ChartWatchlist from "./pages/userPanel/watchlist/ChartWatchlist";
// import Watchlist from "./pages/Watchlist";
// import ActiveOrders from "./pages/userPanel/watchlist/ActiveOrders";
// import DailyDeals from "./pages/userPanel/watchlist/DailyDeals";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/HomePage"));
const SigninPage = lazy(() => import("./pages/admin/SigninPage"));
const Verification = lazy(() => import("./pages/Verification"));
const UserPanel = lazy(() => import("./pages/UserPanel"));
const AdminPage = lazy(() => import("./pages/admin/AdminPage"));
const Dashboard = lazy(() => import("./components/adminPage/Dashboard"));
const AdminEstates = lazy(() => import("./pages/admin/AdminEstates"));
const Estates = lazy(() =>
  import("./components/adminPage/AdminEstate/Estates")
);
const LockPosition = lazy(() =>
  import("./components/adminPage/AdminEstate/LockPosition")
);
const SellPosition = lazy(() =>
  import("./components/adminPage/AdminEstate/SellPosition")
);
const GetDocuments = lazy(() =>
  import("./components/adminPage/AdminEstate/GetDocuments")
);
const NewEstate = lazy(() => import("./components/adminPage/NewEstate"));
const EditState = lazy(() => import("./components/adminPage/EditEstate"));
const ManagementPage = lazy(() => import("./pages/admin/ManagementPage"));
const AdminPanel = lazy(() => import("./pages/admin/AdminPanel"));
const AdminList = lazy(() =>
  import("./components/adminPage/adminPanel/AdminList")
);
const AddAdmin = lazy(() =>
  import("./components/adminPage/adminPanel/AddAdmin")
);
const EditAdmin = lazy(() =>
  import("./components/adminPage/adminPanel/EditAdmin")
);
const Profile = lazy(() => import("./pages/admin/Profile"));

const ManagementAssets = lazy(() =>
  import("./components/userPanel/ManagementAssets")
);
const Assets = lazy(() =>
  import("./components/userPanel/managementAssets/Assets")
);
const Transactions = lazy(() =>
  import("./components/userPanel/managementAssets/Transactions")
);
const Watchlist = lazy(() => import("./pages/Watchlist"));
const ClassicWatchlist = lazy(() =>
  import("./pages/userPanel/watchlist/ClassicWatchlist")
);
const ActiveOrders = lazy(() =>
  import("./pages/userPanel/watchlist/ActiveOrders")
);
const DailyDeals = lazy(() => import("./pages/userPanel/watchlist/DailyDeals"));
const ChartWatchlist = lazy(() =>
  import("./pages/userPanel/watchlist/ChartWatchlist")
);
const Reports = lazy(() => import("./pages/userPanel/Reports"));
const DocumentStatus = lazy(() =>
  import("./pages/userPanel/reports/DocumentStatus")
);
const GetDocument = lazy(() => import("./pages/userPanel/reports/GetDocument"));
const UserLogin = lazy(() => import("./pages/UserLogin"));
const UserSignup = lazy(() => import("./pages/UserSignup"));
const Favourites = lazy(() => import("./pages/userPanel/Favourites"));

const router = createBrowserRouter([
  {
    index: true,
    element: (
      <Suspense>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: "login",
    element: (
      <Suspense>
        <UserLogin />
      </Suspense>
    ),
  },
  {
    path: "signup",
    element: (
      <Suspense>
        <UserSignup />
      </Suspense>
    ),
  },
  // {
  //   path: ":estateId",
  //   children: [
  //     {
  //       index: true,
  //       element: <DetailPage />,
  //       // id: 'estate-detail',
  //       // loader: estateDetailLoader,
  //     },
  //   ],
  // },
  {
    path: "admin",
    element: (
      <Suspense>
        <AdminPage />
      </Suspense>
    ),
    loader: checkAuthLoader,
    // loader: () => import("./util/auth").then((module) => module.loader()),
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <Dashboard />
          </Suspense>
        ),
        loader: checkSuperAdminLoader,
        // loader: () => import("./util/auth").then((module) => module.loader()),
      },
      {
        path: "estates",
        children: [
          {
            path: "",
            element: (
              <Suspense>
                <AdminEstates />
              </Suspense>
            ),
            children: [
              { index: true, element: <Estates /> },
              {
                path: "LockPosition",
                element: (
                  <Suspense>
                    <LockPosition />
                  </Suspense>
                ),
              },
              {
                path: "SellPosition",
                element: (
                  <Suspense>
                    <SellPosition />
                  </Suspense>
                ),
              },
              {
                path: "GetDocuments",
                element: (
                  <Suspense>
                    <GetDocuments />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "new",
            element: (
              <Suspense>
                <NewEstate />
              </Suspense>
            ),

            // action: manipulateEstateAction,
          },
          {
            path: ":estateId",
            element: (
              <Suspense>
                <EditState />
              </Suspense>
            ),
            id: "estate-detail",
            // loader: estateDetailLoader,
            loader: (meta) =>
              import("./pages/DetailPage").then((module) =>
                module.loader(meta)
              ),
            // action: manipulateEstateAction,
          },
        ],
      },
      {
        path: "management",
        element: (
          <Suspense>
            <ManagementPage />
          </Suspense>
        ),
        loader: checkSuperAdminLoader,
      },
      {
        path: "admins",
        element: <AdminPanel />,
        loader: checkSuperAdminLoader,
        children: [
          {
            index: true,
            element: (
              <Suspense>
                <AdminList />
              </Suspense>
            ),
          },
          {
            path: "addAdmin",
            element: (
              <Suspense>
                <AddAdmin />
              </Suspense>
            ),
          },
          {
            path: "edit/:adminId",
            element: (
              <Suspense>
                <EditAdmin />
              </Suspense>
            ),
            // loader: adminDetailLoader,
            loader: (meta) =>
              import("./components/adminPage/adminPanel/EditAdmin").then(
                (module) => module.loader(meta)
              ),
          },
          // {
          //   path: "personal",
          //   element: <Personal />,
          // },
        ],
      },
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "profile",
        element: (
          <Suspense>
            <Profile />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "loginAdmin",
    element: (
      <Suspense>
        <SigninPage />
      </Suspense>
    ),
  },
  {
    path: "Verification",
    element: (
      <Suspense>
        <Verification />
      </Suspense>
    ),
  },
  {
    path: "userPanel",
    element: (
      <Suspense>
        <UserPanel />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense>
            <ManagementAssets />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense>
                <Assets />
              </Suspense>
            ),
          },
          {
            path: "transactions",
            element: (
              <Suspense>
                <Transactions />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "favourites",
        element: (
          <Suspense>
            <Favourites />
          </Suspense>
        ),
      },
      {
        path: "watchlist",
        element: (
          <Suspense>
            <Watchlist />
          </Suspense>
        ),
        children: [
          {
            path: "classic",
            element: (
              <Suspense>
                <ClassicWatchlist />
              </Suspense>
            ),
            children: [
              {
                index: true,
                element: (
                  <Suspense>
                    <ActiveOrders />
                  </Suspense>
                ),
              },
              {
                path: "dailyDeals",
                element: (
                  <Suspense>
                    <DailyDeals />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "",
            element: (
              <Suspense>
                <ChartWatchlist />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "reports",
        element: (
          <Suspense>
            <Reports />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense>
                <GetDocument />
              </Suspense>
            ),
          },
          {
            path: "documentstatus",
            element: (
              <Suspense>
                <DocumentStatus />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
